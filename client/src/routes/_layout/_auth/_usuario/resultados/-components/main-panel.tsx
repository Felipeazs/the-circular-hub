import type { Respuestas } from "@monorepo/server/db"

import { Link } from "@tanstack/react-router"
import { useEffect, useMemo, useState } from "react"

import { Badge } from "@/client/components/ui/badge"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { buttonVariants, cn } from "@/client/lib/utils"
import { daysOff, getBagde, recentResult, recomendaciones } from "@/client/utils/resultados"

import { DeleteRespuesta } from "./delete-respuesta"

type MainPanelProps = {
	resultados?: Respuestas
}

export type Recomendaciones = typeof recomendaciones.high

export function MainPanel({ resultados }: MainPanelProps) {
	const [potencial, setPotencial] = useState<Recomendaciones>()

	const daysDiff = useMemo(() => {
		if (resultados) {
			return daysOff(resultados)
		}
	}, [resultados])

	const puntaje = useMemo(() => {
		if (resultados) {
			return recentResult(resultados)
		}
	}, [resultados])

	useEffect(() => {
		if (puntaje) {
			if (puntaje.score <= 33) {
				setPotencial(recomendaciones.low)
			} else if (puntaje.score > 33 && puntaje.score <= 66) {
				setPotencial(recomendaciones.medium)
			} else {
				setPotencial(recomendaciones.high)
			}
		}
	}, [resultados])

	return (
		<div className="space-y-5">
			<Card>
				{resultados ? (
					<div className="space-y-4">
						<CardHeader className="text-end">
							<CardDescription className="">
								Completado hace {daysDiff} {daysDiff === 1 ? "día" : "días"}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								<div className="flex justify-between">
									<div className="space-y-2">
										<p className="text-muted-foreground text-sm font-medium">Puntaje general</p>
										<Badge
											variant="outline"
											className={cn("text-2xl font-bold", getBagde(puntaje!.score).style)}>
											{getBagde(puntaje!.score).title}{" "}
										</Badge>
									</div>
									<DeleteRespuesta respuestaId={resultados.id} />
								</div>

								<p className="font-medium">{potencial?.titulo}</p>

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
					</div>
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
