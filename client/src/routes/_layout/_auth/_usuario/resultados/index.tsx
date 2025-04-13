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
import { buttonVariants } from "@/client/lib/utils"
import { useStore } from "@/client/store"
import { lineGraph, recentResult } from "@/client/utils/resultados"

import { MainPanel } from "./-components/main-panel"
import { Recomendacion } from "./-components/recomendacion"

export const Route = createFileRoute("/_layout/_auth/_usuario/resultados/")({
	component: RouteComponent,
})

function RouteComponent() {
	const { resultados } = useStore()

	const graphRes = useMemo(() => {
		if (resultados?.length) {
			return lineGraph(resultados!)
		}
	}, [resultados])

	const puntaje = useMemo(() => {
		if (resultados) {
			return recentResult(resultados[0])
		}
	}, [resultados])

	return (
		<div className="w-[93%] space-y-6 md:w-full">
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
				<TabsList className="inline w-full truncate sm:w-max">
					<TabsTrigger value="recent">Reciente</TabsTrigger>
					{resultados?.length ? (
						<>
							<TabsTrigger value="all">Todos</TabsTrigger>
							<TabsTrigger value="trends">Tendencia</TabsTrigger>
							<TabsTrigger value="recs">Recomendaciones</TabsTrigger>
						</>
					) : null}
				</TabsList>
				<TabsContent value="recent">
					<MainPanel resultados={resultados?.[0]} />
				</TabsContent>
				<TabsContent value="all">
					{resultados?.length ? (
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
												date: res?.date,
												score: res?.score,
												id: res!.id,
											},
										].map((assessment) => (
											<div
												key={assessment.id}
												className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
												<div className="grid grid-cols-8 items-baseline gap-5">
													<p className="w-[40px] text-xl font-bold md:text-2xl">{i + 1}.</p>
													<p className="text-muted-foreground md:text-md col-span-6 grid text-xs">
														{assessment.date}
													</p>
												</div>
												<div className="flex items-center gap-4 text-xs md:text-sm">
													<div className="text-right">
														<p className="font-bold">{assessment?.score}%</p>
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
								{/*
									<Pagination className="mt-5">
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious href="#" />
										</PaginationItem>
										<PaginationItem>
											<PaginationLink href="#">1</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationEllipsis />
										</PaginationItem>
										<PaginationItem>
											<PaginationNext href="#" />
										</PaginationItem>
									</PaginationContent>
								</Pagination>
								*/}
							</CardContent>
						</Card>
					) : null}
				</TabsContent>
				<TabsContent value="trends">
					{resultados?.length ? (
						<Card>
							<CardHeader>
								<CardTitle>Tendencias de progreso</CardTitle>
								<CardDescription>Sigue el progreso de tus evaluaciones</CardDescription>
							</CardHeader>
							<CardContent className="p-2 md:p-6">
								<div className="rounded-md border border-dashed md:p-2">
									<div className="h-[300px] md:w-full">
										<LineGraph data={graphRes} />
									</div>
								</div>
							</CardContent>
						</Card>
					) : null}
				</TabsContent>
				<TabsContent value="recs">
					<Recomendacion score={puntaje?.score} />
				</TabsContent>
			</Tabs>
		</div>
	)
}
