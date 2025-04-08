import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { TriangleAlert } from "lucide-react"
import { toast } from "sonner"

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/client/components/ui/alert-dialog"
import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { deleteUsuario } from "@/client/lib/queries"
import { useStore } from "@/client/store"

export function EliminarUsuario() {
	const navigate = useNavigate()
	const { quit } = useStore()

	const { mutate } = useMutation({
		mutationFn: deleteUsuario,
		onSuccess: () => {
			toast("Usuario eliminado")
			quit()
			navigate({ to: "/" })
		},
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Zona de peligro</CardTitle>
				<CardDescription className="border-destructive flex items-center gap-4 rounded-md border-1 p-4 text-red-500">
					<TriangleAlert width={50} />
					Eliminar esta cuenta borrará permanentemente toda la información de tus evaluaciones.
				</CardDescription>
			</CardHeader>
			<CardFooter>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="destructive" className="hover:cursor-pointer">
							Eliminar Cuenta
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>¿Estás seguro que quieres eliminar tu cuenta?</AlertDialogTitle>
							<AlertDialogDescription>
								Esta acción no puede revertirse. Se eliminarán permanentemente tus datos y tus
								evaluaciones.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel className="hover:cursor-pointer">Cancelar</AlertDialogCancel>
							<AlertDialogAction className="hover:cursor-pointer" onClick={() => mutate()}>
								OK
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>{" "}
			</CardFooter>
		</Card>
	)
}
