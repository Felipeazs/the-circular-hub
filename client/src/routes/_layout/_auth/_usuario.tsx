import { createFileRoute, Outlet } from "@tanstack/react-router"
import { useEffect } from "react"

import { Login } from "@/client/components/login"
import { getRespuestasOptions, meQueryOptions } from "@/client/lib/queries"
import { useStore } from "@/client/store"

export const Route = createFileRoute("/_layout/_auth/_usuario")({
	loader: async ({ context: { queryClient, usuario } }) => ({
		usuario: await queryClient.fetchQuery(meQueryOptions(usuario?.id)),
		resultados: await queryClient.fetchQuery(getRespuestasOptions(usuario?.id)),
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const { setUsuario, setResultados } = useStore()
	const { usuario, resultados } = Route.useLoaderData()

	useEffect(() => {
		if (usuario && resultados) {
			setUsuario(usuario)
			setResultados(resultados)
		}
	}, [usuario])

	if (!usuario) {
		return <Login />
	}

	return usuario && <Outlet />
}
