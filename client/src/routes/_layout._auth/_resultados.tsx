import { createFileRoute, Outlet } from "@tanstack/react-router"
import { useEffect } from "react"

import { getRespuestasOptions } from "@/client/lib/queries"
import { useStore } from "@/client/store"

export const Route = createFileRoute("/_layout/_auth/_resultados")({
	loader: async ({ context: { queryClient, usuario } }) => ({
		respuestas: await queryClient.fetchQuery(getRespuestasOptions(usuario!.id)),
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const { respuestas } = Route.useLoaderData()
	const { setResultados } = useStore()

	useEffect(() => {
		if (respuestas) {
			setResultados(respuestas)
		}
	}, [respuestas])

	return <Outlet />
}
