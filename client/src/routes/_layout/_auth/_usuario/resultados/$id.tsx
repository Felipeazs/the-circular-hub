import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useMemo, useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs"
import { getRespuestaByIdOptions } from "@/client/lib/queries"
import { recentResult, recomendaciones } from "@/client/utils/resultados"

import { MainPanel } from "./-components/main-panel"
import { Recomendacion, type Recomendaciones } from "./-components/recomendacion"

export const Route = createFileRoute("/_layout/_auth/_usuario/resultados/$id")({
	loader: async ({ context: { queryClient, usuario }, params }) => ({
		resultado: await queryClient.fetchQuery(getRespuestaByIdOptions(usuario!.id, params.id)),
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const { resultado } = Route.useLoaderData()
	const [potencial, setPotencial] = useState<Recomendaciones>()

	const puntaje = useMemo(() => {
		if (resultado) {
			return recentResult(resultado)
		}
	}, [resultado])

	useEffect(() => {
		if (puntaje?.score) {
			if (puntaje.score <= 33) {
				setPotencial(recomendaciones.low)
			} else if (puntaje.score > 33 && puntaje.score <= 66) {
				setPotencial(recomendaciones.medium)
			} else {
				setPotencial(recomendaciones.high)
			}
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
					<MainPanel resultados={resultado!} isHidden />
				</TabsContent>
				<TabsContent value="recomendaciones">
					<Recomendacion score={puntaje!.score} potencial={potencial!} />
				</TabsContent>
			</Tabs>
		</div>
	)
}
