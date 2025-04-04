import { createFileRoute, Link } from "@tanstack/react-router"
import { useMemo } from "react"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { getRespuestaByIdOptions } from "@/client/lib/queries"
import { buttonVariants, cn } from "@/client/lib/utils"
import { daysOff, recentResult } from "@/client/utils/resultados"

export const Route = createFileRoute("/_layout/_auth/_usuario/resultados/$id")({
	loader: async ({ context: { queryClient, usuario }, params }) => ({
		respuesta: await queryClient.fetchQuery(getRespuestaByIdOptions(usuario!.id, params.id)),
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const { respuesta } = Route.useLoaderData()

	const daysDiff = useMemo(() => {
		if (respuesta) {
			return daysOff(respuesta)
		}
	}, [respuesta])

	const puntaje = useMemo(() => {
		return recentResult(respuesta)
	}, [respuesta])

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Evaluacion</h1>
					<p className="text-muted-foreground mt-2">
						Ve y analiza los resultados de tu evaluacion.
					</p>
				</div>
				{/* <Button variant="outline" size="sm">
					// <DownloadIcon className="mr-2 h-4 w-4" />
					// Export Results //{" "}
				</Button> */}
			</div>

			<Card>
				{respuesta ? (
					<>
						<CardHeader>
							<CardTitle>Resultados</CardTitle>
							<CardDescription>
								Completado hace {daysDiff} {daysDiff === 1 ? "día" : "días"}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<p className="text-muted-foreground text-sm font-medium">Puntaje general</p>
										<p className="text-2xl font-bold">{puntaje?.score}%</p>
									</div>
									<div className="space-y-2">
										<p className="text-muted-foreground text-sm font-medium">Respuestas</p>
										<p className="text-2xl font-bold">{puntaje?.total}/29</p>
									</div>
								</div>

								<div className="space-y-4">
									<h3 className="font-medium">Desglose por categoría</h3>
									{[
										{
											name: "1. Gestión organizacional y estrategia circular",
											score: puntaje!.ge,
										},
										{
											name: "2. Vinculación con  el entorno",
											score: puntaje!.v,
										},
										{
											name: "3. Gestión de recursos",
											score: puntaje!.gr,
										},
										{
											name: "4. Gestión de residuos y valorización",
											score: puntaje!.gs,
										},
										{
											name: "5. Diseño circular e innovación",
											score: puntaje!.ds,
										},
										{
											name: "6. Colaboración e intercambio industrial",
											score: puntaje!.cl,
										},
										{
											name: "7. Extensión del ciclo de vida y reparabilidad",
											score: puntaje!.er,
										},
										{
											name: "8. Energía renovable y eficiencia energética",
											score: puntaje!.ee,
										},
										{
											name: "9. Impacto ambiental y social",
											score: puntaje!.ia,
										},
										{
											name: "10. Educación y sensibilización interna",
											score: puntaje!.es,
										},
									].map((category) => (
										<div key={category.name} className="space-y-1">
											<div className="flex items-center justify-between">
												<p>{category.name}</p>
												<p className="font-medium">{category.score}%</p>
											</div>
											<div className="bg-muted h-2 w-full rounded-full">
												<div
													className={cn("h-2 rounded-full", {
														"bg-red-300": category?.score <= 33,
														"bg-orange-300": category?.score > 33 && category.score <= 67,
														"bg-green-300": category?.score > 67,
													})}
													style={{ width: `${category.score}%` }}
												/>
											</div>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</>
				) : (
					<CardHeader>
						<CardTitle>Evaluación</CardTitle>
						<CardDescription>Realice una nueva evaluación</CardDescription>
						<Link
							to="/evaluacion"
							className={buttonVariants({ variant: "outline", className: "w-20" })}>
							Aquí
						</Link>
					</CardHeader>
				)}
			</Card>
		</div>
	)
}
