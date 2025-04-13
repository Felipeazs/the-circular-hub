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

export function recentResult(respuestas: Respuestas): Puntajes | undefined {
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
	}

	return puntajes
}

type LineGraphProps = {
	name: string
	puntaje: number
	fecha: string
}

export function lineGraph(respuestas: Respuestas[] | null) {
	const data: LineGraphProps[] = []
	if (respuestas) {
		respuestas.toReversed().forEach((respuesta, i) => {
			const res = recentResult(respuesta)

			data.push({ name: `${i + 1}`, puntaje: res!.score, fecha: res!.date })
		})

		return data
	}
}

export const recomendaciones = {
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
				"Riesgo regulatorio: No cumplir con normativas ambientales emergentes puede resultar en sanciones o pérdida de acceso a mercados más exigentes.",
				"Oportunidades comerciales desaprovechadas: la falta de integración completa de principios circulares limita su capacidad para atraer clientes e inversionistas interesados en sosteniblidad.",
			],
		},
		indicaciones: [
			"Priorizar áreas críticas: identificar las áreas con menor desempeño (por ejemplo, gestión de residuos o diseño circular) y desarrollar planes específicos para mejorarlas.",
			"Capacitar al personal clave: invertir en formación sobre herramientas como ecodiseño, análisis de ciclo de vida o estrategias de valorización de residuos.",
			"Desarrollar una hora de ruta circular: formalizar un plan estratégico con objetivos claros medibles para avanzar hacia la economía circular",
		],
	},
	low: {
		titulo:
			"La empresa está en una etapa inicial, con una baja implementación de prácticas circulares",
		potencial: {
			subtitulo:
				"Enfocarse en establecer fundamentos básicos, como políticas ambientales, monitoros de recursos y gestión de residuos",
			detalles: [
				"Pérdida económica a largo plazo: ignorar prácticas circulares puede llevar a costos crecientes por ineficiencia en recursos y gestión de residuos.",
				"Reputación deteriorada: los consumidores e inversionistas valoran cada vez más la sosteniblidad; no actuar puede dañar la perceptición pública y reducir oportunidades comerciales",
				"Impacto ambiental negativo: la falta de acción contribuye a problemas globales como el cambio climático, agotamiento de recursos naturales y contaminación.",
			],
		},
		indicaciones: [
			"Establecer fundamentos básicos: implementar sistemas simples para monitorear consumo de recursos, identificar residuos generados y establecer políticas ambientales iniciales.",
			"Iniciar con proyectos piloto: comenzar con inciativas pequeñas pero visibles, como separación básica de residuos o sustitución parcial por materiales reciclados.",
			"Sensibilizar al equipo interno: realizar talleres introductorios sobre economía circular para construir una cultura organizacional orientada a la sosteniblidad.",
		],
	},
}
export function getBagde(score: number) {
	let style = "font-bold"
	let nivel = "bajo"

	if (score <= 33) {
		style = style.concat(" bg-red-200")
	} else if (score > 33 && score <= 66) {
		style = style.concat(" bg-yellow-200")
		nivel = "medio"
	} else if (score > 66) {
		style = style.concat(" bg-green-200")
		nivel = "alto"
	}

	const title = `${score}% - ${nivel}`

	return { score, style, title }
}
