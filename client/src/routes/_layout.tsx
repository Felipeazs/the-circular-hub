import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import { Settings } from "lucide-react"

import { ProgressBar } from "../components/progress-bar"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { buttonVariants } from "../lib/utils"
import { useStore } from "../store"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
})

function RouteComponent() {
	const { isLoggedIn, usuario: data } = useStore((state) => state)
	const isFetching = useIsFetching()
	const isMutating = useIsMutating()

	return (
		<div className="min-h-screen overflow-y-auto">
			<div className="flex h-[48px] items-center justify-between gap-4 px-2 py-2 md:px-20">
				<Link to="/" className="font-bold uppercase" viewTransition>
					The Circular Hub
				</Link>
				{!isLoggedIn && (
					<div className="flex gap-2">
						<Link to="/login" className={buttonVariants({ variant: "outline" })} viewTransition>
							Log in
						</Link>
						<Link to="/registro" className={buttonVariants({ variant: "default" })} viewTransition>
							Regístrate
						</Link>
					</div>
				)}
				{isLoggedIn && (
					<Avatar>
						<DropdownMenu>
							<DropdownMenuTrigger className="w-full hover:cursor-pointer">
								<AvatarImage src={data?.image ?? ""} width={32} height={32} alt="profile-image" />
								<AvatarFallback>
									{data?.nombre?.substring(0, 1)?.toUpperCase() ?? "N"}
									{data?.apellido?.substring(0, 1)?.toUpperCase() ?? "N"}
								</AvatarFallback>
								<DropdownMenuContent>
									<DropdownMenuItem>
										<Link to="/ajustes" className="flex w-full items-center gap-2">
											<Settings />
											<span>Cuenta</span>
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenuTrigger>
						</DropdownMenu>
					</Avatar>
				)}
			</div>
			<div className="h-1">
				<ProgressBar status={isFetching || isMutating} min={isLoggedIn ? 25 : 0} />
			</div>
			<div className="min-h-screen">
				<hr />
				<Outlet />
			</div>
			{/* Footer */}
			<footer className="absolute z-10 my-6 w-full border-t bg-white py-6 md:py-0">
				<div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
					<p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
						© 2025 AssessmentPro. All rights reserved.
					</p>
					<div className="flex gap-4">
						<Link
							to="/"
							className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
							Terms
						</Link>
						<Link
							to="/"
							className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
							Privacy
						</Link>
						<Link
							to="/"
							className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
							Contact
						</Link>
					</div>
				</div>
			</footer>
		</div>
	)
}
