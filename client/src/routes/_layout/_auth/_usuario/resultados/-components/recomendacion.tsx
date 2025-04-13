import { useEffect, useState } from "react"

import { Badge } from "@/client/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/client/components/ui/card"
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
					<CardTitle className="flex justify-between">
						<p className="">Clasificación de la empresa</p>
						<div className="text-end">
							<Badge variant="outline" className={getBagde(score).style}>
								{getBagde(score).title}
							</Badge>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex w-full flex-col gap-2">
						<p>Potencial perdido: {potencial?.potencial.subtitulo}</p>
						<ul className="list-disc pl-5">
							{potencial?.potencial.detalles.map((detalle) => <li key={detalle}>{detalle}</li>)}
						</ul>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Recomendaciones</CardTitle>
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
