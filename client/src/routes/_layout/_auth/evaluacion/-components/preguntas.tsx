import { useState } from "react"

import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Label } from "@/client/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/client/components/ui/radio-group"

// Define the question structure
type Question = {
	id: string
	text: string
	category: string
}

// Define the categories and questions
const categories = [
	{
		id: "gestion_estrategia",
		title: "1. Gestión organizacional y estrategia circular",
		description:
			"Evalúa si la empresa cuanta con una estrategia formal o una integración estructurada que incorpore principios de economía circular en sus operaciones, incluyendo la existencia de una hoja de ruta específica para su implementación",
		puntos: [
			{
				punto: "Consideración de la economía circular en las dicisiones estratégicas",
				id: "gestion_estrategia_1",
			},
			{
				punto: "Uso de índices de circularidad para medir el desempeño",
				id: "gestion_estrategia_2",
			},
			{
				punto: "Difusión interna sobre economía circular (newsletter, correos masivos, intranet)",
				id: "gestion_estrategia_3",
			},
			{
				punto:
					"Designación de personal responsable y trabajadores interesados en impulsar acciones circulares",
				id: "gestion_estrategia_4",
			},
		],
	},
	{
		id: "vinculacion",
		title: "2. Vinculación con  el entorno",
		description:
			"Este tópico analiza las relaciiones de la empresa con su entorno geográfico y empresarial, con el objetivo de evaluar el nivel de interacción y colaboración con actores ecternos para identificar y aprovechar sinergias territoriales e industriales",
		puntos: [
			{ punto: "Participación en proyectos locales o territoriales", id: "vinculacion_1" },
			{
				punto: "Conocimiento sobre sectores económicos y residuos generados por empresas vecinas",
				id: "vinculacion_2",
			},
			{
				punto: "Colaboraciones potenciales con otras organizaciones del entorno",
				id: "vinculacion_3",
			},
		],
	},
	{
		id: "gestion_recursos",
		title: "3. Gestión de recursos",
		description:
			"Identifica oportunidades para optimizar el uso de recursos y avanzar hacia insumos más sostenibles, enfocándosse en cómo la empresa getiona sus materiales, energía y agua",
		puntos: [
			{ punto: "Monitoreo del consumo de amterias primas", id: "gestion_recursos_1" },
			{
				punto: "Uso de materiales locales, ronovables o reciclados",
				id: "gestion_recursos_2",
			},
			{
				punto: "Incorporación de estrategias sostenibles en compras",
				id: "gestion_recursos_3",
			},
			{
				punto: "Conocimiento del impacto ambiental y social asociado a los materiales utilizados",
				id: "gestion_recursos_4",
			},
			{
				punto: "Consumo interno y monitoreo del agua",
				id: "gestion_recursos_5",
			},
			{
				punto: "Uso de servicios externos relacionados (transporte, recicladores)",
				id: "gestion_recursos_6",
			},
		],
	},
	{
		id: "gestion_residuos",
		title: "4. Gestión de residuos y valorización",
		description:
			"Determinal el nivel actual de recuperaciión y aprovechamiento de residuos y explorar oportunidades para mejorar su valorización. Evalúa cómo la empresa gestiona los residuos generados en sus procesos productivos. Incluye preguntas sobre:",
		puntos: [
			{
				punto: "Indentificación y cuantificación mensual de residuos generados",
				id: "gestion_residuos_1",
			},
			{
				punto:
					"Cumplimiento con la jerarquía de gestión de residuos (prevención, reutilización, reciclaje)",
				id: "gestion_residuos_2",
			},
			{
				punto: "Procesos actuales para residuos no preligrosos (papel, metales, orgánicos)",
				id: "gestion_residuos_3",
			},
			{
				punto: "Prácticas actuales: pago por retiro, entrega a terceros o tratamiento interno",
				id: "gestion_residuos_4",
			},
			{
				punto: "Conocimiento del destino final de los residuos gestionados por terceros",
				id: "gestion_residuos_5",
			},
			{
				punto: "Interés y capacidad para implementar procesos de valorización",
				id: "gestion_residuos_6",
			},
		],
	},
	{
		id: "diseno_circular",
		title: "5. Diseño circular e innovación",
		description:
			"Determinael nivel actual de recuperación y aprovechamiento de residuos, explorando oportunidades para mejorar su valorización. Evalúa la forma en que la empresa gestiona los residuos generados en sus procesos productivos",
		puntos: [
			{
				punto:
					"Uso de herramientas como ecodiseño, análisis de ciclo de vidda o simbiosis industrial",
				id: "diseno_circular_1",
			},
			{
				punto: "Proyectos relacionados con ecodiseño para optimizar duración o reparabilidad",
				id: "diseno_circular_2",
			},
			{
				punto: "Incorporación de componentes modulares reutilizables o remanufacturables",
				id: "diseno_circular_3",
			},
			{
				punto: "Desarrollo de soluciones para mantenimiento y reparación",
				id: "diseno_circular_4",
			},
			{
				punto: "Iniciativas que promuevan la innovación circular dentro del negocio",
				id: "diseno_circular_5",
			},
		],
	},
	{
		id: "colaboracion",
		title: "6. Colaboración e intercambio industrial",
		description:
			"Explora las posiblidades de colaboración entre empresas para cerra ciclos de materiales e identifica oportunidades para maximizar la eficiencia en el uso de recursos a través de sinergias interempresariales",
		puntos: [
			{
				punto:
					"Identificación de residuos que puedan servir como insumos para otras organizaciones",
				id: "colaboracion_1",
			},
			{
				punto:
					"Participación en procesos colaborativos como logística inversa o simbiosis industria",
				id: "colaboracion_2",
			},
			{
				punto: "Intercambio potencial de recursos como maquinaria o almacinamiento",
				id: "colaboracion_3",
			},
			{ punto: "Fomento del uso compartido entre empresas o consumidores", id: "colaboracion_4" },
		],
	},
	{
		id: "extension_reparabilidad",
		title: "7. Extensión del ciclo de vida y reparabilidad",
		description:
			"Evalúa si la empresa está maximizando el valor generado a lo largo del ciclo de vida del producto omaterial, analizando las acciones que implementa para extender la vida útil de productos y materiales no renovables",
		puntos: [
			{
				punto: "Soluciones propuestas para reparación y mantenimiento",
				id: "extension_reparabilidad_1",
			},
			{
				punto: "Comunicación efectiva sobre reparabilidad a consumidores",
				id: "extension_reparabilidad_2",
			},
			{
				punto: "Iniciativas para retrasar obsolescencia o promover escalabilidad",
				id: "extension_reparabilidad_3",
			},
		],
	},
	{
		id: "energia_eficiencia",
		title: "8. Energía renovable y eficiencia energética",
		description:
			"Identifica oportunidades para mejorar la eficiencia energética e incoporar fuentes de energía renovable en las operaciones. Este tópico evalúa la gestión del consumo energético dentro de la empresa",
		puntos: [
			{
				punto: "Monitoreo del consumo energético interno",
				id: "energia_eficiencia_1",
			},
			{
				punto: "Uso actual o potencial futuro de fuentes renovables",
				id: "energia_eficiencia_2",
			},
			{
				punto: "Iniciativas para optimizar flujos logísticos asociados al impacto ambiental",
				id: "energia_eficiencia_3",
			},
		],
	},
	{
		id: "impacto_ambiental",
		title: "9. Impacto ambiental y social",
		description:
			"Determina si la empresa cuneta con una visión integral que combine sostenibilidad ambiental y responsabilidad social. Evalúa si mide y gestiona de manera activa los impactos ambientales asociados a sus operaciones",
		puntos: [
			{
				punto:
					"Identificación dle impacto ambiental asociado a extracción, fabricación y transporte",
				id: "impacto_ambiental_a",
			},
			{
				punto: "Estrategias implementadas para optimizar el uso sostenible a largo plazo",
				id: "impacto_ambiental_b",
			},
			{
				punto:
					"Iniciativas que integran desarrollo social en proyectos circulares destadados en la comunidad",
				id: "impacto_ambiental_c",
			},
		],
	},
	{
		id: "educacion_sensibilizacion",
		title: "10. Educación y sensibilización interna",
		description:
			"Evalúa si los empleados participan activamente como agentes de cambio en la transición hacia prácticas circulares dentro de la empresa. Explora las iniciativas internas orientadas a fomentas compotamientos responsables y sostenibles entre el personal",
		puntos: [
			{
				punto: "Acciones educativas sobre consumo responsable en el lugar de trabajo",
				id: "educacion_sensibilizacion_1",
			},
			{
				punto:
					"Participación activa del personal en prevención del desperdicio durante proceos productivos",
				id: "educacion_sensibilizacion_2",
			},
		],
	},
]

// Create questions for each category (26 total)
const questions: Question[] = [
	{
		id: "gestion_estrategia_1",
		text: "¿La economía circular es considerada dentro de la organización?",
		category: "gestion_estrategia",
	},
	{
		id: "gestion_estrategia_2",
		text: "¿Cuentan con una persona encargada de economía circular?",
		category: "gestion_estrategia",
	},
	{
		id: "gestion_estrategia_3",
		text: "¿La empresa cuenta con índices de circularidad para medir su desempeño?",
		category: "gestion_estrategia",
	},

	{
		id: "vinculacion_1",
		text: "¿Actualmente la empresa tiene algún vínculo o proyecto dentro del territorio en que se encuentra ubicada?",
		category: "vinculacion",
	},
	{
		id: "vinculacion_2",
		text: "¿Conocen cuáles son los sectores económicos de las empresas que están en el mismo territorio donde se ubica la empresa?",
		category: "vinculacion",
	},
	{
		id: "vinculacion_3",
		text: "¿Se conocen cuáles son los residuos generados en mayor cantidad por las empresas en el entorno donde se ubica la empresa?",
		category: "vinculacion",
	},
	{
		id: "gestion_recursos_1",
		text: "¿La empresa conoce cuánto es el consumo de materias primas?",
		category: "gestion_recursos",
	},
	{
		id: "gestion_recursos_2",
		text: "¿Las materias primas que utiliza son renovables?",
		category: "gestion_recursos",
	},
	{
		id: "gestion_recursos_3",
		text: "¿La empresa realiza compras utilizando estregias de sosteniblidad?",
		category: "gestion_recursos",
	},
	{
		id: "gestion_residuos_1",
		text: "¿La empresa tiene identificados los residuos generados en sus procesos productivos?",
		category: "gestion_residuos",
	},
	{
		id: "gestion_residuos_2",
		text: "¿Actualmente, la empresa gestiona los residuos generados (pago por retiro, entrega a terceros, tratamiento interno)?",
		category: "gestion_residuos",
	},
	{
		id: "gestion_residuos_3",
		text: "¿Se conoce el destino o uso que el gesto/reciclador le da a los rediuos?",
		category: "gestion_residuos",
	},
	{
		id: "diseno_circular_1",
		text: "¿La empresa utiliza alguna herramienta de economía circular, como ecodiseño o análisis de ciclo de vida?",
		category: "diseno_circular",
	},
	{
		id: "diseno_circular_2",
		text: "¿Sus productos cuentan con componentes modulares que puedan ser remanufacturados o reutilizados?",
		category: "diseno_circular",
	},
	{
		id: "diseno_circular_3",
		text: "¿Existen proyectos o herramientas para ecodiseñar productos o servicios para optimizar su duración de uso?",
		category: "diseno_circular",
	},
	{
		id: "colaboracion_1",
		text: "¿Existen iniciativas para compratir maquinaria y servcios a mayor escala con otras empresas?",
		category: "colaboracion",
	},
	{
		id: "colaboracion_2",
		text: "¿Podrían las salidas (residuos) de una organización del entorno ser utilizadas como recurosos para la empresa?",
		category: "colaboracion",
	},
	{
		id: "colaboracion_3",
		text: "¿Se identifican beneficios al compratir servicios y almacenamiento con otras organizaciones del entorno?",
		category: "colaboracion",
	},
	{
		id: "extension_reparabilidad_1",
		text: "¿Existen acciones para incrementar la duración del uso de los productos, retrasando su obsolescencia?",
		category: "extension_reparabilidad",
	},
	{
		id: "extension_reparabilidad_2",
		text: "¿Tienen posibilidades de proponer soluciones de reparación para los productos fabricados?",
		category: "extension_reparabilidad",
	},
	{
		id: "extension_reparabilidad_3",
		text: "¿Pueden comunicar efectivamente la vida útil y reparabilidad de los productos que fabrican?",
		category: "extension_reparabilidad",
	},
	{
		id: "energia_eficiencia_1",
		text: "¿La empresa conoce el consumo interno de energía para sus procesos principales?",
		category: "energia_eficiencia",
	},
	{
		id: "energia_eficiencia_2",
		text: "¿Utiliza la empresa alguna fuente de enrgía renovable?",
		category: "energia_eficiencia",
	},
	{
		id: "impacto_ambiental_1",
		text: "¿La organización identifica los impactos ambientales asociados a las materias primas que utiliza?",
		category: "impacto_ambiental",
	},
	{
		id: "impacto_ambiental_2",
		text: "¿Existen iniciativas que integren el desarrollo social en proyectos circulares destacados en la comunidad?",
		category: "impacto_ambiental",
	},
	{
		id: "impacto_ambiental_3",
		text: "¿La organización puede implementar estrategias para optimizar el uso sostenible a largo plazo de las materias primas que utiliza?",
		category: "impacto_ambiental",
	},
	{
		id: "educacion_sensibilizacion_1",
		text: "¿Existen iniciativas para fomentar hábitos de consumo responsable entre los empleados en el lugar de trabajo?",
		category: "educacion_sensibilizacion",
	},
	{
		id: "educacion_sensibilizacion_2",
		text: "¿Realizan acciones para invlucrar al personal en prevenir el desperdicio de consumibles durante los procesos productivos?",
		category: "educacion_sensibilizacion",
	},
	{
		id: "educacion_sensibilizacion_3",
		text: "¿La empresa organiza sesiones educativas o talleres sobre sostenibilidad y economía circular para sus empleados?",
		category: "educacion_sensibilizacion",
	},
]

// Initialize empty answers object
type Answers = {
	[key: string]: "si" | "no" | null
}

const initializeAnswers = (): Answers => {
	const initialAnswers: Answers = {}
	questions.forEach((question) => {
		initialAnswers[question.id] = null
	})
	return initialAnswers
}
export function Preguntas({ saveForm }: { saveForm: (answers: Answers) => void }) {
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
	const [answers, setAnswers] = useState<Answers>(initializeAnswers())
	const [showSummary, setShowSummary] = useState(false)

	const currentCategory = categories[currentCategoryIndex]
	const categoryQuestions = questions.filter((q) => q.category === currentCategory?.id)

	const handleAnswerChange = (questionId: string, value: "si" | "no") => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: value,
		}))
	}

	const nextCategory = () => {
		if (currentCategoryIndex < categories.length - 1) {
			setCurrentCategoryIndex(currentCategoryIndex + 1)
			window.scrollTo(0, 0)
		} else {
			setShowSummary(true)
			window.scrollTo(0, 0)
		}
	}

	const prevCategory = () => {
		setShowSummary(false)
		if (currentCategoryIndex > 0) {
			setCurrentCategoryIndex(currentCategoryIndex - 1)
			window.scrollTo(0, 0)
		}
	}

	const resetForm = () => {
		setAnswers(initializeAnswers())
		setCurrentCategoryIndex(0)
		setShowSummary(false)
		window.scrollTo(0, 0)
	}

	const handleSaveForm = () => {
		saveForm(answers)
	}

	const isCurrentCategoryComplete = () => {
		return categoryQuestions.every((question) => answers[question.id] !== null)
	}

	const renderCategoryQuestions = () => {
		return (
			<>
				<CardHeader className="p-2 md:p-6">
					<CardTitle>{currentCategory.title}</CardTitle>
					<CardDescription>{currentCategory.description}</CardDescription>
					<CardDescription>
						<ul className="list-disc pl-5">
							{currentCategory.puntos.map((p) => (
								<li key={p.id}>{p.punto}</li>
							))}
						</ul>
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6 p-2 md:p-6">
					{categoryQuestions.map((question, index) => (
						<div key={question.id} className="space-y-2">
							<p className="font-medium">
								{index + 1}. {question.text}
							</p>
							<RadioGroup
								value={answers[question.id] || ""}
								onValueChange={(value) => handleAnswerChange(question.id, value as "si" | "no")}
								className="flex space-x-4">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="si" id={`${question.id}-si`} />
									<Label htmlFor={`${question.id}-si`}>Si</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="no" id={`${question.id}-no`} />
									<Label htmlFor={`${question.id}-no`}>No</Label>
								</div>
							</RadioGroup>
						</div>
					))}
				</CardContent>
			</>
		)
	}

	const renderSummary = () => {
		return (
			<>
				<CardHeader>
					<CardTitle>Resumen de tus respuestas</CardTitle>
					<CardDescription>Review de las respuestas a todas las preguntas</CardDescription>
				</CardHeader>
				<CardContent className="space-y-8 p-2 md:p-6">
					{categories.map((category) => {
						const categoryQuestions = questions.filter((q) => q.category === category.id)
						return (
							<div key={category.id} className="space-y-4">
								<h3 className="border-b pb-2 text-lg font-semibold">{category.title}</h3>
								<div className="space-y-3">
									{categoryQuestions.map((question) => (
										<div key={question.id} className="grid grid-cols-12 gap-2">
											<div className="col-span-9 text-sm">{question.text}</div>
											<div className="col-span-3 text-sm font-medium">
												{answers[question.id] === "si" ? (
													<span className="text-green-600">Si</span>
												) : answers[question.id] === "no" ? (
													<span className="text-red-600">No</span>
												) : (
													<span className="text-gray-400">{" - "}</span>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						)
					})}

					<div className="bg-muted mt-6 rounded-lg p-4">
						<p className="text-center text-sm">Gracias por completar nuestro cuestionario!</p>
					</div>
				</CardContent>
			</>
		)
	}
	return (
		<div className="flex gap-10">
			<div className="">
				{!showSummary && (
					<div className="mb-6">
						<div className="mb-2 flex items-center justify-between">
							<p className="text-muted-foreground text-sm">
								Categoria {currentCategoryIndex + 1} de {categories.length}
							</p>
							<p className="text-sm font-medium">
								{Math.round((currentCategoryIndex / categories.length) * 100)}% Completado
							</p>
						</div>
						<div className="bg-muted h-2 w-full rounded-full">
							<div
								className="bg-primary h-2 rounded-full transition-all duration-300"
								style={{ width: `${(currentCategoryIndex / categories.length) * 100}%` }}
							/>
						</div>
					</div>
				)}

				<Card className="flex w-full">
					{showSummary ? renderSummary() : renderCategoryQuestions()}

					<CardFooter className="flex justify-between pt-6">
						{!showSummary ? (
							<>
								<Button
									variant="outline"
									onClick={prevCategory}
									disabled={currentCategoryIndex === 0}>
									Anterior
								</Button>
								<Button onClick={nextCategory} disabled={!isCurrentCategoryComplete()}>
									{currentCategoryIndex === categories.length - 1 ? "Ver Resumen" : "Siguiente"}
								</Button>
							</>
						) : (
							<>
								<Button
									variant="outline"
									onClick={prevCategory}
									disabled={currentCategoryIndex === 0}
									className="mx-auto">
									Editar Respuestas
								</Button>
								<Button variant="outline" onClick={handleSaveForm} className="mx-auto">
									Guardar
								</Button>
								<Button variant="outline" onClick={resetForm} className="mx-auto">
									Reiniciar
								</Button>
							</>
						)}
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
