import { createFileRoute, Link } from "@tanstack/react-router"
import { BarChart3, CheckCircle, PlusCircle } from "lucide-react"
import { useMemo } from "react"

import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { useStore } from "@/client/store"
import { recentResult } from "@/client/utils/resultados"

export const Route = createFileRoute("/_layout/_auth/_usuario/panel")({
	component: RouteComponent,
})

function RouteComponent() {
	const { resultados } = useStore()

	const puntajes = useMemo(() => {
		if (resultados) {
			const ultimoPuntaje = recentResult(resultados![0])!.score

			const diffPenultimo = ultimoPuntaje - recentResult(resultados![1])!.score

			const sign = diffPenultimo > 0 ? "+" : ""
			const textDiff = `${sign}${diffPenultimo} desde la última evaluación`

			const mesRealizadas = resultados.filter((res) => {
				return new Date(res.createdAt).getMonth() === new Date().getMonth()
			}).length

			const signMes = mesRealizadas > 0 ? "+" : ""
			const textMes = `${signMes}${mesRealizadas} realizadas este mes`

			return {
				ultimoPuntaje,
				textDiff,
				textMes,
			}
		}
	}, [resultados])

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Panel Principal</h1>
				<p className="text-muted-foreground mt-2">
					Bienvenido! Este es el resumen de tus evaluaciones.
				</p>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Evaluaciones</CardTitle>
						<CheckCircle className="text-muted-foreground h-4 w-4" />
					</CardHeader>
					<CardContent>
						<div className="text-4xl font-bold">{resultados?.length}</div>
						<p className="text-muted-foreground mt-1 text-xs">{puntajes?.textMes}</p>
					</CardContent>
				</Card>
				{resultados?.length ? (
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Último Puntaje</CardTitle>
							<BarChart3 className="text-muted-foreground h-4 w-4" />
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold">{puntajes?.ultimoPuntaje}%</div>
							<p className="text-muted-foreground mt-1 text-xs">{puntajes?.textDiff}</p>
						</CardContent>
					</Card>
				) : null}
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				{resultados?.length ? (
					<Card className="col-span-1">
						<CardHeader>
							<CardTitle>Evaluaciones Recientes</CardTitle>
							<CardDescription>Tus evaluaciones realizadas recientemente</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{resultados?.slice(0, 3).map((respuesta, i) => {
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
											className="flex items-center justify-between border-b pb-2 last:border-0">
											<div className="grid grid-cols-5 items-end gap-5">
												<p className="grid-col-span-1 grid w-[40px] text-xl font-bold lg:text-2xl">
													{i + 1}.
												</p>
												<div className="col-span-4 grid">
													<p className="text-muted-foreground">Completado</p>
													<p className="text-muted-foreground">{assessment.date}</p>
												</div>
											</div>
											<Button variant="outline" size="sm" asChild>
												<Link to="/resultados/$id" params={{ id: assessment.id }}>
													Ver
												</Link>
											</Button>
										</div>
									))
								})}
							</div>
						</CardContent>
					</Card>
				) : null}

				<Card className="col-span-1">
					<CardHeader>
						<CardTitle>Funciones Rápidas</CardTitle>
						<CardDescription>Inicia una nueva evaluación o revisa tus resultados</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button className="w-full" asChild>
							<Link to="/evaluacion">
								<PlusCircle className="mr-2 h-4 w-4" />
								Iniciar Nueva Evaluación
							</Link>
						</Button>
						<Button variant="outline" className="w-full" asChild>
							<Link to="/resultados">
								<BarChart3 className="mr-2 h-4 w-4" />
								Ver todos los resultados
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
