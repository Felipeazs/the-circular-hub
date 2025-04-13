import { resetPassSchema } from "@monorepo/server/db"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { useAppForm } from "../../../hooks/form"
import { resetPassword } from "../../../lib/queries"

export const Route = createFileRoute("/_layout/password/reset")({
	validateSearch: (search: Record<string, string>) => {
		return {
			token: search.token as string,
		}
	},
	component: RouteComponent,
})

export function RouteComponent() {
	const navigate = useNavigate()
	const { token } = Route.useSearch()

	const { mutate } = useMutation({
		mutationFn: resetPassword,
		onSuccess: () => {
			toast("Tu contraseña ha sido modificada")

			navigate({ to: "/" })
		},
		onError: (error) => {
			toast(error.message)
		},
	})

	const form = useAppForm({
		defaultValues: {
			password: "",
			repeat_password: "",
		},
		onSubmit: ({ value }) => {
			mutate({ ...value, token })
		},
	})

	return (
		<Card className="mx-auto mt-20 w-max">
			<CardHeader>
				<CardTitle>Cambiar contraseña</CardTitle>
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
						name="password"
						validators={{ onChange: resetPassSchema.shape.password }}
						children={(field) => (
							<field.TextField label="Contraseña" placeholder="Ingresa tu nueva contraseña" />
						)}
					/>
					<form.AppField
						name="repeat_password"
						validators={{ onChange: resetPassSchema.shape.repeat_password }}
						children={(field) => (
							<field.TextField
								label="Repetir Contraseña"
								placeholder="Ingresa tu nueva contraseña"
							/>
						)}
					/>
					<form.AppForm>
						<form.SubscribeButton label="Cambiar" />
					</form.AppForm>
				</form>
			</CardContent>
		</Card>
	)
}
