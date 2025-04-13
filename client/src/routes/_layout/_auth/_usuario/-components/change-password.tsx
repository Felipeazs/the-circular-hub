import { changePassSchema } from "@monorepo/server/db"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { useAppForm } from "@/client/hooks/form"
import { changePassword } from "@/client/lib/queries"
import { useStore } from "@/client/store"

export function ChangePassword() {
	const query = useQueryClient()
	const { usuario } = useStore()

	const { mutate } = useMutation({
		mutationFn: changePassword,
		onSuccess: async () => {
			toast("Contraseña cambiada con éxito")
			await query.invalidateQueries({ queryKey: ["usuario", usuario?.id] })
		},
		onError: (error) => {
			toast(error.message)
		},
	})

	const form = useAppForm({
		defaultValues: {
			password: "",
			new_password: "",
			repeat_new_password: "",
		},
		onSubmit: ({ value }) => {
			mutate(value)
			form.reset()
		},
	})
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				form.handleSubmit()
			}}>
			<Card>
				<CardHeader>
					<CardTitle className="text-xl">Seguridad</CardTitle>
					<CardDescription>Cambia tu contraseña</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<form.AppField
						name="password"
						validators={{ onChange: changePassSchema.shape.password }}
						children={(field) => <field.TextField label="Contraseña actual" type="password" />}
					/>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<form.AppField
							name="new_password"
							validators={{ onChange: changePassSchema.shape.new_password }}
							children={(field) => <field.TextField label="Nueva contraseña" type="password" />}
						/>
						<form.AppField
							name="repeat_new_password"
							validators={{ onChange: changePassSchema.shape.repeat_new_password }}
							children={(field) => <field.TextField label="Repite la contraña" type="password" />}
						/>
					</div>
				</CardContent>
				<CardFooter>
					<form.AppForm>
						<form.SubscribeButton label="Cambiar contraseña" />
					</form.AppForm>
				</CardFooter>
			</Card>
		</form>
	)
}
