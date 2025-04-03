import { formatRelative, subDays } from "date-fns"
import { es } from "date-fns/locale"

type Respuestas = {
	[key: string]: "si" | "no" | Date | string | null
}

export function daysOff(respuestas: Respuestas) {
	const hoy = new Date().getTime()
	const completado = (respuestas.createdAt as Date).getTime()
	const diff = hoy - completado
	const aDayInMs = 24 * 60 * 60 * 1000

	return Math.round(diff / aDayInMs)
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
	id: string
	[key: string]: number | string
}

export function recentResult(respuestas: Respuestas | null): Puntajes | undefined {
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
		id: "",
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
		puntajes.date = formatRelative(subDays(date, daysOff(respuestas)), new Date(), { locale: es })

		puntajes.id = respuestas.id as string

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
}

type LineGraphProps = {
	name: string
	puntaje: number
}

export function lineGraph(respuestas: Respuestas[] | null) {
	const data: LineGraphProps[] = []
	if (respuestas) {
		respuestas.toReversed().forEach((respuesta, i) => {
			const res = recentResult(respuesta)

			data.push({ name: `Eval ${i + 1}`, puntaje: res!.score })
		})

		return data
	}
}
