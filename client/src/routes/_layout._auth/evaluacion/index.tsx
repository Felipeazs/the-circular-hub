import { createFileRoute } from "@tanstack/react-router"

import { Preguntas } from "./-components/preguntas"

export const Route = createFileRoute("/_layout/_auth/evaluacion/")({
	component: RouteComponent,
})

type Answers = {
	[key: string]: "yes" | "no" | null
}

function RouteComponent() {
	function saveForm(form: Answers) {
		console.warn(form)
		// Guardar formulario en bd
		// Luego de guardar redireccionar a /resultados/$id
	}
	return (
		<div className="w-[80%] space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">New Assessment</h1>
				<p className="text-muted-foreground mt-2">
					Complete the questionnaire below to receive your personalized results.
				</p>
			</div>
			<Preguntas saveForm={saveForm} />
		</div>
	)
}
