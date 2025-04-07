import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useMemo, useState } from "react"

import { Badge } from "@/client/components/ui/badge"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs"
import { getRespuestaByIdOptions } from "@/client/lib/queries"
import { buttonVariants, cn } from "@/client/lib/utils"
import { daysOff, recentResult } from "@/client/utils/resultados"

export const Route = createFileRoute("/_layout/_auth/_usuario/resultados/$id")({
	loader: async ({ context: { queryClient, usuario }, params }) => ({
		resultado: await queryClient.fetchQuery(getRespuestaByIdOptions(usuario!.id, params.id)),
	}),
	component: RouteComponent,
})

type Recomendaciones = typeof recomendaciones.high

const recomendaciones = {
	high: {
		titulo:
			"La empresa tiene una alta implementación de prácticas alineadas con la economía circular",
		potencial: {
			subtitulo: "Innovación y liderazgo",
			detalles: [
				"Falta de diferenciación competitiva: las empresas en este nivel podrían perder oportunidades para posicionarse como líderes en sostenibilidad dentro de su sector.",
				"Innovación limitada: No explorar modelos desruptivos como el ecodiseño avanzado, la simbiosis industrial o los modelos de nogocio circulares puede limitar su capacidad para capturar nuevos mercados.",
				"Impacto social y ambiental reducido: aunque tienen una buena base, no maximizar su impacto positivo significa desaprovechar oportunidades de contribuir significativamente a la reducción del cambio climático y la desiguladad social",
			],
		},
		indicaciones: [
			"Explorar innovaciones disruptivas: implementar proyectos piloto que incluyan tecnologías avanzadas como el blockchain para trazabilidad o análisis de ciclo de vida completo",
			"Liderar colaboraciones sectoriales: participar activamente en iniciativas regionales o sectoriales para estableces estándares y compartir mejores prácticas",
			"Escalar impacto: invertir en proyectos que amplíen el alcance de sus iniciativas sostenibles, como modelos de negocio basados en servicios o economía colaborativa.",
		],
	},
	medium: {
		titulo:
			"La empresa tiene un progreso moderado, con áreas desarrolladas y otras que requieren mejoras",
		potencial: {
			subtitulo: "Eficiencia operativa y cumplimiento",
			detalles: [
				"Costos operativos más altos: la falta de optimización en áreas clave, como la gestión de residuos o recursos, puede generar gastos innecesarios.",
				"Riesgo regulatorio: No cumplor con normativas ambientales emergentes puede resultar en sanciones opérdida de accesoo a mercados más exigentes.",
				"Oportunidades comerciales desaprovechadas: la falta de integración completa de principios circulares limita su capacidad para atraer clientes e inversionistas interesados en sosteniblidad.",
			],
		},
		indicaciones: [
			"Priorizar áreas críticas: identificar las áreas con menoor desempeño (por ejemplo, gestión de residuos o deseño circular) y desarrllar planes específicos para mejorarlas.",
			"Capacitar al personal clave: invertir en formación sobre herramientas como ecodiseño, análisis de ciclo de vida o estrategias de valorización de residuos.",
			"Desarrollar una hora de ruta circular: formalizar un plan estratégico con objetivos claros medibles para avanzart hacia la economía circular",
		],
	},
	low: {
		titulo:
			"La empresa está en una etapa inicial, con una baja implementación de prácticas circulares",
		potencial: {
			subtitulo:
				"Enfocarse en establecer fundamentos básicos, como políticas ambientales, monitoros de recursos y gestión de residuos",
			detalles: [
				"Pérdida económia a largo plazo: ignorar prácticas circulares puede llevar a costos crecientes por ineficiencia en recursos y gestión de residuos.",
				"Reputación deteriorada: los consumidores e inversionistas valoran cada vez más la sosteniblidad; no actuar puede dañar la perceptición pública y reducir oportunidades comerciales",
				"Impacto ambiental negativo: la falta de acción contribuye a problemas globales como el cambio climático, agotamiento de recursos naturales y contaminación.",
			],
		},
		indicaciones: [
			"Establecer fundamentos básicos: implementar sistemas simples para monitorear consumo de recursos, identificar residuos generados y extablecer políticas ambientales iniciales.",
			"Iniciar con proyectos piloto: comenzar con inciativas peqyeñas pero visibles, como separación básica de residuos o sustitución parcial por materiales reciclados.",
			"Sensibilizar al equipo interno: realizar talleres introductorios sobre economía circular para construir una cultura organizacional orientada a la sosteniblidad.",
		],
	},
}
function RouteComponent() {
	const { resultado } = Route.useLoaderData()
	const [potencial, setPotencial] = useState<Recomendaciones>()

	const daysDiff = useMemo(() => {
		if (resultado) {
			return daysOff(resultado)
		}
	}, [resultado])

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

	function getBagde(score: number) {
		let style = "bg-red-200"
		let nivel = "Bajo"

		if (score > 33 && score <= 66) {
			style = "bg-yellow-200"
			nivel = "Medio"
		} else if (score > 66) {
			style = "bg-green-200"
			nivel = "Alto"
		}

		const title = `${score}% Nivel ${nivel}`

		return { score, style, title }
	}

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
					<Card>
						{resultado ? (
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
																"bg-red-200": category?.score <= 33,
																"bg-yellow-200": category?.score > 33 && category.score <= 67,
																"bg-green-200": category?.score > 67,
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
				<TabsContent value="recomendaciones">
					<div className="space-y-5">
						<Card>
							<CardHeader>
								<CardTitle>Recomendaciones</CardTitle>
								<CardDescription className="grid w-full grid-cols-2 justify-between">
									<p>Clasificación de la empresa</p>
									<div className="w-full text-end">
										<Badge variant="outline" className={getBagde(puntaje!.score).style}>
											{getBagde(puntaje!.score).title}
										</Badge>
									</div>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex w-full flex-col gap-2">
									<p className="font-bold">{potencial?.titulo}</p>
									<p>Potencial perdido: {potencial?.potencial.subtitulo}</p>
									<ul className="list-disc pl-5">
										{potencial?.potencial.detalles.map((detalle) => (
											<li key={detalle}>{detalle}</li>
										))}
									</ul>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Indicaciones</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex w-full flex-col gap-2">
									<ul className="list-disc pl-5">
										{potencial?.indicaciones.map((detalle) => <li key={detalle}>{detalle}</li>)}
									</ul>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
