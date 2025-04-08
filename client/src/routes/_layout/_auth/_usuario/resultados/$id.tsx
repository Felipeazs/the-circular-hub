import { createFileRoute } from "@tanstack/react-router"
import { useMemo } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs"
import { getRespuestaByIdOptions } from "@/client/lib/queries"
import { recentResult } from "@/client/utils/resultados"

import { MainPanel } from "./-components/main-panel"
import { Recomendacion } from "./-components/recomendacion"

export const Route = createFileRoute("/_layout/_auth/_usuario/resultados/$id")({
	loader: async ({ context: { queryClient, usuario }, params }) => ({
		resultado: await queryClient.fetchQuery(getRespuestaByIdOptions(usuario!.id, params.id)),
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const { resultado } = Route.useLoaderData()

	const puntaje = useMemo(() => {
		if (resultado) {
			return recentResult(resultado)
		}
	}, [resultado])

	return (
		<div className="w-full space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Evaluación</h1>
					<p className="text-muted-foreground mt-2">
						Ve y analiza los resultados de tu evaluacion.
					</p>
				</div>
				{/* <Button variant="outline" size="sm">
					// <DownloadIcon className="mr-2 h-4 w-4" />
					// Export Results //{" "}
				</Button> */}
			</div>

			<Tabs defaultValue="resumen">
				<TabsList>
					<TabsTrigger value="resumen">Resumen</TabsTrigger>
					<TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
				</TabsList>
				<TabsContent value="resumen">
					<MainPanel resultados={resultado!} />
				</TabsContent>
				<TabsContent value="recomendaciones">
					<Recomendacion score={puntaje?.score} />
				</TabsContent>
			</Tabs>
		</div>
	)
}
