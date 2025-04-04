import { createFileRoute, Link } from "@tanstack/react-router"
import { useMemo } from "react"

import { LineGraph } from "@/client/components/charts/line"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs"
import { buttonVariants, cn } from "@/client/lib/utils"
import { useStore } from "@/client/store"
import { daysOff, lineGraph, recentResult } from "@/client/utils/resultados"

export const Route = createFileRoute("/_layout/_auth/_usuario/resultados/")({
	component: RouteComponent,
})

function RouteComponent() {
	const { resultados } = useStore()

	const daysDiff = useMemo(() => {
		if (resultados?.length) {
			return daysOff(resultados[0])
		}
	}, [resultados])

	const puntaje = useMemo(() => {
		return recentResult(resultados![0])
	}, [resultados])

	const graphRes = useMemo(() => {
		return lineGraph(resultados!)
	}, [resultados])

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Mis Resultados</h1>
					<p className="text-muted-foreground mt-2">
						Ve y analiza los resultados de tus evaluaciones.
					</p>
				</div>
				{/* <Button variant="outline" size="sm">
					// <DownloadIcon className="mr-2 h-4 w-4" />
					// Export Results //{" "}
				</Button> */}
			</div>

			<Tabs defaultValue="recent">
				<TabsList>
					<TabsTrigger value="recent">Reciente</TabsTrigger>
					<TabsTrigger value="all">Todos</TabsTrigger>
					<TabsTrigger value="trends">Tendencia</TabsTrigger>
				</TabsList>
				<TabsContent value="recent" className="space-y-4">
					<Card>
						{resultados?.[0] ? (
							<>
								<CardHeader>
									<CardTitle>Evaluación</CardTitle>
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
												<p className="text-muted-foreground text-sm font-medium">resultados</p>
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
				</TabsContent>
				<TabsContent value="all">
					<Card>
						<CardHeader>
							<CardTitle>Todos los resultados</CardTitle>
							<CardDescription>Ve todas las evaluaciones anteriores</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{resultados?.map((respuesta, i) => {
									const res = recentResult(respuesta)
									return [
										{
											name: "Evaluacion",
											date: res!.date,
											score: res!.score,
											id: res!.id,
										},
									].map((assessment) => (
										<div
											key={assessment.id}
											className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
											<div className="grid grid-cols-8 items-baseline gap-5">
												<p className="w-[40px] font-bold md:text-4xl">{i + 1}.</p>
												<p className="text-muted-foreground md:text-md col-span-6 grid text-xs">
													Completado {assessment.date}
												</p>
											</div>
											<div className="flex items-center gap-4 text-xs md:text-sm">
												<div className="text-right">
													<p className="font-medium">{assessment.score}%</p>
													<p className="text-muted-foreground">Puntaje</p>
												</div>
												<Link
													to="/resultados/$id"
													params={{ id: assessment.id }}
													className={buttonVariants({ variant: "outline" })}>
													Ver
												</Link>
											</div>
										</div>
									))
								})}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="trends">
					<Card>
						<CardHeader>
							<CardTitle>Tendencias de progreso</CardTitle>
							<CardDescription>Sigue el progreso de tus evaluaciones</CardDescription>
						</CardHeader>
						<CardContent className="p-2 md:p-6">
							<div className="rounded-md border border-dashed">
								<div className="h-[300px] w-[280px] md:w-[500px]">
									<LineGraph data={graphRes} />
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
