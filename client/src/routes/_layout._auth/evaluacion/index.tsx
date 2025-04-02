import { useMutation } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import { saveRespuestas } from "@/client/lib/queries"

import { Preguntas } from "./-components/preguntas"

export const Route = createFileRoute("/_layout/_auth/evaluacion/")({
	component: RouteComponent,
})

type Answers = {
	[key: string]: "si" | "no" | null | undefined
}

function RouteComponent() {
	const navigate = useNavigate()
	const { mutate } = useMutation({
		mutationFn: saveRespuestas,
		onSuccess: (data) => {
			navigate({ to: `/resultados/${data.id}` })
		},
	})
	function saveForm(form: Answers) {
		console.warn(form)

		mutate(form)

		// Luego de guardar redireccionar a /resultados/$id
	}
	return (
		<div className="w-[90%] space-y-6">
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
