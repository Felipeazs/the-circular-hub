import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { saveRespuestas } from "@/client/lib/queries"

import { Preguntas } from "./-components/preguntas"

export const Route = createFileRoute("/_layout/_auth/evaluacion/")({
	component: RouteComponent,
})

type Answers = {
	[key: string]: "si" | "no" | null
}

function RouteComponent() {
	const { mutate } = useMutation({
		mutationFn: saveRespuestas,
	})
	function saveForm(form: Answers) {
		console.warn(form)

		mutate(form)

		// Luego de guardar redireccionar a /resultados/$id
	}
	return (
		<div className="w-[80%] space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Nueva Evaluación</h1>
				<p className="text-muted-foreground mt-2">
					Completa el cuestionario para recibir resultados personalizados
				</p>
			</div>
			<Preguntas saveForm={saveForm} />
		</div>
	)
}
