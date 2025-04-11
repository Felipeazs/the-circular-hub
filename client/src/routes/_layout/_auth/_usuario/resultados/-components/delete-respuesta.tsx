import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Trash } from "lucide-react"
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
import { deleteRespuestaById } from "@/client/lib/queries"
import { useStore } from "@/client/store"

type DeleteRespuestaProps = {
	respuestaId: string
}

export function DeleteRespuesta({ respuestaId }: DeleteRespuestaProps) {
	const navigate = useNavigate()
	const { usuario, updateResultados } = useStore()
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: deleteRespuestaById,
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["resultados", usuario?.id] })

			updateResultados({ respuesta: data, action: "delete" })

			navigate({ to: "/panel" })

			toast("Evaluación eliminada")
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return (
		<div className="space-y-2 text-end">
			<p className="text-white">.</p>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="ghost" size="sm" className="hover:cursor-pointer">
						<Trash />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="font-raleway">
					<AlertDialogHeader>
						<AlertDialogTitle>Eliminar evaluación</AlertDialogTitle>
						<AlertDialogDescription>
							¿Estás seguro que quieres eliminar esta evaluación?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="hover:cursor-pointer">Cancelar</AlertDialogCancel>
						<AlertDialogAction className="hover:cursor-pointer" onClick={() => mutate(respuestaId)}>
							OK
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
