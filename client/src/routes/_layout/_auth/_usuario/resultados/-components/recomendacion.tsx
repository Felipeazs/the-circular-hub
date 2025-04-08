import { Badge } from "@/client/components/ui/badge"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { cn } from "@/client/lib/utils"
import { getBagde, type recomendaciones } from "@/client/utils/resultados"

export type Recomendaciones = typeof recomendaciones.high

type RecomendacionProps = {
	score?: number
	potencial: Recomendaciones
	isHidden?: boolean
}

export function Recomendacion({ score, potencial, isHidden = false }: RecomendacionProps) {
	return (
		score && (
			<div className={cn("space-y-5", { hidden: isHidden })}>
				<Card>
					<CardHeader>
						<CardTitle>Recomendaciones</CardTitle>
						<CardDescription className="grid w-full grid-cols-2 justify-between">
							<p>Clasificación de la empresa</p>
							<div className="w-full text-end">
								<Badge variant="outline" className={getBagde(score).style}>
									{getBagde(score).title}
								</Badge>
							</div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex w-full flex-col gap-2">
							<p className="font-bold">{potencial?.titulo}</p>
							<p>Potencial perdido: {potencial?.potencial.subtitulo}</p>
							<ul className="list-disc pl-5">
								{potencial?.potencial.detalles.map((detalle) => <li key={detalle}>{detalle}</li>)}
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
		)
	)
}
