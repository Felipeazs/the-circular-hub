import { createFileRoute, Link } from "@tanstack/react-router"
import { formatRelative, subDays } from "date-fns"
import { es } from "date-fns/locale"
import { useMemo } from "react"

import { LineGraph } from "@/client/components/charts/line"
import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs"
import { getRespuestasOptions } from "@/client/lib/queries"
import { buttonVariants } from "@/client/lib/utils"

export const Route = createFileRoute("/_layout/_auth/resultados/")({
	loader: async ({ context: { queryClient, usuario } }) => ({
		respuestas: await queryClient.fetchQuery(getRespuestasOptions(usuario!.id)),
	}),
	component: RouteComponent,
})
type LineGraphProps = {
	name: string
	puntaje: number
}

type Puntajes = {
	ge: number
	v: number
	gr: number
	gs: number
	ds: number
	cl: number
	er: number
	ee: number
	ia: number
	es: number
	total: number
	score: number
	date: string
	[key: string]: number | string
}

type Respuestas = {
	[key: string]: "si" | "no" | Date | string | null
}

function RouteComponent() {
	const { respuestas } = Route.useLoaderData()

	const daysDiff = useMemo(() => {
		if (respuestas?.length) {
			const hoy = new Date().getTime()
			const completado = respuestas[0]?.createdAt.getTime()
			const diff = hoy - completado
			const aDayInMs = 24 * 60 * 60 * 1000
			return Math.round(diff / aDayInMs)
		}
	}, [respuestas])

	const getResults = (respuestas: Respuestas | null): Puntajes => {
		const puntajes: Puntajes = {
			ge: 0,
			v: 0,
			gr: 0,
			gs: 0,
			ds: 0,
			cl: 0,
			er: 0,
			ee: 0,
			ia: 0,
			es: 0,
			total: 0,
			score: 0,
			date: "",
		}

		if (respuestas) {
			const puntosPorCategoria: { [key: string]: string[] } = {
				ge: ["gestion_estrategia_1", "gestion_estrategia_2", "gestion_estrategia_3"],
				v: ["vinculacion_1", "vinculacion_2", "vinculacion_3"],
				gr: ["gestion_recursos_1", "gestion_recursos_2", "gestion_recursos_3"],
				gs: ["gestion_residuos_1", "gestion_residuos_2", "gestion_residuos_3"],
				ds: ["diseno_circular_1", "diseno_circular_2", "diseno_circular_3"],
				cl: ["colaboracion_1", "colaboracion_2", "colaboracion_3"],
				er: ["extension_reparabilidad_1", "extension_reparabilidad_2", "extension_reparabilidad_3"],
				ee: ["energia_eficiencia_1", "energia_eficiencia_2"],
				ia: ["impacto_ambiental_1", "impacto_ambiental_2", "impacto_ambiental_3"],
				es: [
					"educacion_sensibilizacion_1",
					"educacion_sensibilizacion_2",
					"educacion_sensibilizacion_3",
				],
			}

			for (const categoria in puntosPorCategoria) {
				puntosPorCategoria[categoria].forEach((pregunta) => {
					if (respuestas[pregunta] === "si") {
						puntajes.score++
						puntajes[categoria] = (puntajes[categoria] as number) + 1
					}
					puntajes.total++
				})
			}

			const date = new Date(respuestas.createdAt!)
			puntajes.date = formatRelative(subDays(date, daysDiff!), new Date(), { locale: es })
		}

		puntajes.ge = Math.round((puntajes.ge / 3) * 100)
		puntajes.v = Math.round((puntajes.v / 3) * 100)
		puntajes.gr = Math.round((puntajes.gr / 3) * 100)
		puntajes.gs = Math.round((puntajes.gs / 3) * 100)
		puntajes.ds = Math.round((puntajes.ds / 3) * 100)
		puntajes.cl = Math.round((puntajes.cl / 3) * 100)
		puntajes.er = Math.round((puntajes.er / 3) * 100)
		puntajes.ee = Math.round((puntajes.ee / 2) * 100)
		puntajes.ia = Math.round((puntajes.ia / 3) * 100)
		puntajes.es = Math.round((puntajes.es / 3) * 100)
		puntajes.score = Math.round((puntajes.score / puntajes.total) * 100)

		return puntajes
	}

	const puntaje = useMemo(() => {
		return getResults(respuestas![0])
	}, [respuestas])

	const graphRes = useMemo(() => {
		const data: LineGraphProps[] = []
		if (respuestas) {
			respuestas.toReversed().forEach((respuesta, i) => {
				const res = getResults(respuesta)

				data.push({ name: `Eval ${i + 1}`, puntaje: res.score })
			})

			return data
		}
	}, [respuestas])

	return (
		<div className="w-[80%] space-y-6">
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
						{respuestas?.[0] ? (
							<>
								<CardHeader>
									<CardTitle>Evaluación</CardTitle>
									<CardDescription>Completado hace {daysDiff} días</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-6">
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<p className="text-muted-foreground text-sm font-medium">Puntaje general</p>
												<p className="text-2xl font-bold">{puntaje.score}%</p>
											</div>
											<div className="space-y-2">
												<p className="text-muted-foreground text-sm font-medium">Respuestas</p>
												<p className="text-2xl font-bold">{puntaje.total}/29</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-medium">Desglose por categoría</h3>
											{[
												{
													name: "1. Gestión organizacional y estrategia circular",
													score: puntaje.ge,
												},
												{
													name: "2. Vinculación con  el entorno",
													score: puntaje.v,
												},
												{
													name: "3. Gestión de recursos",
													score: puntaje.gr,
												},
												{
													name: "4. Gestión de residuos y valorización",
													score: puntaje.gs,
												},
												{
													name: "5. Diseño circular e innovación",
													score: puntaje.ds,
												},
												{
													name: "6. Colaboración e intercambio industrial",
													score: puntaje.cl,
												},
												{
													name: "7. Extensión del ciclo de vida y reparabilidad",
													score: puntaje.er,
												},
												{
													name: "8. Energía renovable y eficiencia energética",
													score: puntaje.ee,
												},
												{
													name: "9. Impacto ambiental y social",
													score: puntaje.ia,
												},
												{
													name: "10. Educación y sensibilización interna",
													score: puntaje.es,
												},
											].map((category) => (
												<div key={category.name} className="space-y-1">
													<div className="flex items-center justify-between">
														<p className="text-sm">{category.name}</p>
														<p className="text-sm font-medium">{category.score}%</p>
													</div>
													<div className="bg-muted h-2 w-full rounded-full">
														<div
															className="bg-primary h-2 rounded-full"
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
								{respuestas?.map((respuesta) => {
									const res = getResults(respuesta)
									return [
										{
											name: "Evaluacion",
											date: res.date,
											score: res.score,
											id: 1,
										},
									].map((assessment) => (
										<div
											key={assessment.id}
											className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
											<div>
												<p className="font-medium">{assessment.name}</p>
												<p className="text-muted-foreground text-sm">
													Completado {assessment.date}
												</p>
											</div>
											<div className="flex items-center gap-4">
												<div className="text-right">
													<p className="font-medium">{assessment.score}%</p>
													<p className="text-muted-foreground text-sm">Puntaje</p>
												</div>
												<Button variant="outline" size="sm">
													Ver
												</Button>
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
						<CardContent>
							<div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
								<div className="flex flex-col items-center gap-2 text-center">
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
