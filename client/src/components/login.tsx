import { loginSchema, type LoginUsuario } from "@monorepo/server/db"
import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

import { useAppForm } from "../hooks/form"
import { login } from "../lib/queries"
import { useStore } from "../store"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export function Login() {
	const { enter } = useStore()
	const navigate = useNavigate()

	const { mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: async (data: LoginUsuario) =>
			await login({ email: data.email, password: data.password }),
		onSuccess: (data) => {
			enter(data)
			toast("Bienvenido")

			navigate({ to: "/panel" })
		},
		onError: (error) => {
			toast(error.message)
		},
	})

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: loginSchema,
		},
		onSubmit: ({ value }) => {
			mutate(value)
		},
	})

	return (
		<Card className="mx-auto mt-20 w-max">
			<CardHeader>
				<CardTitle>Ingresar</CardTitle>
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
						validators={{ onChange: loginSchema.shape.email }}
						children={(field) => <field.TextField label="Email" />}
					/>
					<div>
						<form.AppField
							name="password"
							validators={{ onChange: loginSchema.shape.password }}
							children={(field) => <field.TextField label="Contraseña" type="password" />}
						/>
					</div>
					<Link
						to="/password/forgot"
						className="underline-blue-100 text-xs underline underline-offset-1"
						viewTransition>
						¿Has olvidado tu contraseña?
					</Link>
					<form.AppForm>
						<form.SubscribeButton label="Ingresar" />
					</form.AppForm>
				</form>
			</CardContent>
		</Card>
	)
}
