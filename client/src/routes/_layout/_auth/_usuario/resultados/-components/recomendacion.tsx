import { useEffect, useState } from "react"

import { Badge } from "@/client/components/ui/badge"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { getBagde, recomendaciones } from "@/client/utils/resultados"

export type Recomendaciones = typeof recomendaciones.high

type RecomendacionProps = {
	score?: number
}

export function Recomendacion({ score }: RecomendacionProps) {
	const [potencial, setPotencial] = useState<Recomendaciones>()

	useEffect(() => {
		if (score) {
			if (score <= 33) {
				setPotencial(recomendaciones.low)
			} else if (score > 33 && score <= 66) {
				setPotencial(recomendaciones.medium)
			} else {
				setPotencial(recomendaciones.high)
			}
		}
	}, [score])

	return score ? (
		<div className="space-y-5">
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
	) : null
}
