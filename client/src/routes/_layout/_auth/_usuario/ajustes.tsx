import { editUsuarioSchema } from "@monorepo/server/db"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { CircleUserRound, Edit2 } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/client/components/ui/avatar"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Input } from "@/client/components/ui/input"
import { Label } from "@/client/components/ui/label"
import { useAppForm } from "@/client/hooks/form"
import { hasPermission } from "@/client/lib/permission"
import { editMe } from "@/client/lib/queries"
import { useStore } from "@/client/store"

import { ChangePassword } from "./-components/change-password"
import { EliminarUsuario } from "./-components/eliminar-usuario"

export const Route = createFileRoute("/_layout/_auth/_usuario/ajustes")({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const { queryClient, usuario: usuarioCtx } = Route.useRouteContext()
	const { usuario } = useStore()
	const hiddenFileInput = useRef<HTMLInputElement | null>(null)

	const [imageFile, setImageFile] = useState<File | string>("")

	const { mutate } = useMutation({
		mutationKey: ["edit"],
		mutationFn: editMe,
		onSuccess: async () => {
			toast("Usuario editado")

			await queryClient.invalidateQueries({ queryKey: ["usuario", usuarioCtx?.id] })

			navigate({ to: "/panel" })
		},
		onError: (error) => {
			toast(error.message)
		},
	})

	const form = useAppForm({
		defaultValues: {
			nombre: usuario?.nombre ?? "",
			apellido: usuario?.apellido ?? "",
			email: usuario?.email ?? "",
			organizacion: usuario?.organizacion ?? "",
			image: usuario?.image || imageFile,
			roles: usuario?.roles ?? ["user"],
		},
		onSubmit: ({ value }) => {
			form.reset()
			mutate(value)
		},
	})

	return (
		<div className="space-y-6">
			<div className="flex w-full gap-2">
				<Avatar
					onClick={() => hiddenFileInput.current?.click()}
					className="relative h-[62px] w-[62px] border-2 hover:cursor-pointer">
					<AvatarImage
						src={
							imageFile ? URL.createObjectURL(new Blob([imageFile])) : (usuario?.image ?? undefined)
						}
						width={62}
						height={62}
						alt="profile-image"
					/>
					<AvatarFallback>
						{usuario?.nombre?.substring(0, 1)?.toUpperCase() ?? <CircleUserRound />}
						{usuario?.apellido?.substring(0, 1)?.toUpperCase()}
					</AvatarFallback>
					<div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center text-white">
						<Edit2 width={18} height={18} />
						<span className="text-[9px]">max. 1mb</span>
					</div>
				</Avatar>
				<div>
					{usuario?.nombre && usuario?.apellido ? (
						<h1 className="text-xl font-bold tracking-tight md:text-3xl">
							{usuario?.apellido}, {usuario?.nombre}
						</h1>
					) : (
						<h1 className="text-xl font-bold tracking-tight md:text-3xl">Tu Cuenta</h1>
					)}
					<p className="text-muted-foreground mt-2">{usuario?.email}</p>
				</div>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}>
				<Card>
					<CardHeader>
						<CardTitle className="text-xl">Información de tu cuenta</CardTitle>
						<CardDescription>Actualiza la información de tu perfil</CardDescription>
					</CardHeader>
					<CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<form.AppField
							name="nombre"
							validators={{ onChange: editUsuarioSchema.shape.nombre }}
							children={(field) => <field.TextField label="Nombre" />}
						/>
						<form.AppField
							name="apellido"
							validators={{ onChange: editUsuarioSchema.shape.apellido }}
							children={(field) => <field.TextField label="Apellido" />}
						/>
						<form.AppField
							name="organizacion"
							validators={{ onChange: editUsuarioSchema.shape.organizacion }}
							children={(field) => <field.TextField label="Organización" />}
						/>
						<div className="space-y-2">
							<Input
								ref={hiddenFileInput}
								type="file"
								accept="image/*"
								className="hidden"
								onChange={(e) => {
									const file = e.target.files?.[0]
									if (file) {
										if (file.size > 1048576) {
											return toast("La imagen es demasiado grande")
										}
										setImageFile(file)
										form.setFieldValue("image", file)
									}
								}}
							/>
						</div>
						<div>
							{hasPermission(usuarioCtx!, "userRoles", "update") && (
								<>
									<Label>Roles</Label>
									<div className="flex flex-col gap-2">
										{[
											{ id: 1, name: "Super Admin", value: "super_admin" },
											{ id: 2, name: "Admin", value: "admin" },
											{ id: 3, name: "Usuario", value: "user" },
										].map((rol) => (
											<form.AppField
												key={rol.id}
												name="roles"
												children={(field) => (
													<field.CheckboxField value={rol.value} label={rol.name} />
												)}
											/>
										))}
									</div>
								</>
							)}
						</div>
					</CardContent>
					<CardFooter>
						<form.AppForm>
							<form.SubscribeButton label="Guardar cambios" />
						</form.AppForm>
					</CardFooter>
				</Card>
			</form>
			<ChangePassword />
			<EliminarUsuario />
		</div>
	)
}
