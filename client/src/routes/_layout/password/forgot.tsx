import { forgotPassSchema } from "@monorepo/server/db"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { useAppForm } from "../../../hooks/form"
import { forgotPassword } from "../../../lib/queries"

export const Route = createFileRoute("/_layout/password/forgot")({
	component: RouteComponent,
})

export function RouteComponent() {
	const { mutate } = useMutation({
		mutationFn: forgotPassword,
		onSuccess: () => {
			toast("Por favor, revisa tu correo para cambiar la contraseña")
		},
		onError: (error) => {
			toast(error.message)
		},
	})

	const form = useAppForm({
		defaultValues: {
			email: "",
		},
		onSubmit: ({ value }) => {
			mutate(value.email)
		},
	})

	return (
		<Card className="mx-auto mt-20 w-max">
			<CardHeader>
				<CardTitle>Solicitud de cambio de contraseña</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					className="flex w-[270px] flex-col gap-5"
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}>
					<form.AppField
						name="email"
						validators={{ onChange: forgotPassSchema.shape.email }}
						children={(field) => <field.TextField label="Email" placeholder="Ingresa tu email" />}
					/>
					<form.AppForm>
						<form.SubscribeButton label="Enviar" />
					</form.AppForm>
				</form>
			</CardContent>
		</Card>
	)
}
