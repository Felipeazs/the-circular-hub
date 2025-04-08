import type { Respuestas } from "@monorepo/server/db"

import { Link } from "@tanstack/react-router"
import { useMemo } from "react"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { buttonVariants, cn } from "@/client/lib/utils"
import { daysOff, recentResult } from "@/client/utils/resultados"

type MainPanelProps = {
	resultados?: Respuestas
}

export function MainPanel({ resultados }: MainPanelProps) {
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

	return (
		<div className="space-y-5">
			<Card>
				{resultados ? (
					<div className="space-y-4">
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
