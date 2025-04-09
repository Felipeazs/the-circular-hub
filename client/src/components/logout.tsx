import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { LogOut } from "lucide-react"

import { logout } from "../lib/queries"
import { useStore } from "../store"
import { Button } from "./ui/button"

export function Logout() {
	const { quit } = useStore()
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			quit()

			queryClient.invalidateQueries({ queryKey: ["auth"] })

			navigate({ to: "/" })
		},
	})

	const handleLogout = () => {
		mutate()
	}

	return (
		<div className="flex h-[20px] w-full items-center gap-2 text-red-500">
			<LogOut className="text-red-500" />
			<Button
				variant="ghost"
				size="sm"
				className="m-0 p-0 hover:cursor-pointer"
				onClick={handleLogout}>
				Salir
			</Button>
		</div>
	)
}
