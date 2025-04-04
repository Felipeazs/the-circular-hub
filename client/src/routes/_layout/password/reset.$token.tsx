import { resentSchema } from "@monorepo/server/db"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { useAppForm } from "../../../hooks/form"
import { forgotPassword } from "../../../lib/queries"

export const Route = createFileRoute("/_layout/password/reset/$token")({
	component: RouteComponent,
})

export function RouteComponent() {
	const { mutate } = useMutation({
		mutationFn: forgotPassword,
		onSuccess: () => {},
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
				<CardTitle>Cambiar contraseña</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					className="flex w-[250px] flex-col gap-5"
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}>
					<form.AppField
						name="email"
						validators={{ onChange: resentSchema.shape.email }}
						children={(field) => <field.TextField label="Email" placeholder="Ingresa tu email" />}
					/>
					<form.AppForm>
						<form.SubscribeButton label="Enviar solicitud" />
					</form.AppForm>
				</form>
			</CardContent>
		</Card>
	)
}
