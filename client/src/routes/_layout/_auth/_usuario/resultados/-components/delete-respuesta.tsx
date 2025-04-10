import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Trash } from "lucide-react"
import { toast } from "sonner"

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
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["respuestas", usuario?.id] })

			updateResultados(respuestaId)

			navigate({ to: "/resultados" })

			toast("Evaluación eliminada")
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return (
		<div className="space-y-2 text-end">
			<p className="text-white">.</p>
			<Button
				variant="outline"
				size="sm"
				className="hover:cursor-pointer"
				onClick={() => mutate(respuestaId)}>
				<Trash />
			</Button>
		</div>
	)
}
