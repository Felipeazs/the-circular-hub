import { createFileRoute, Outlet, redirect, useLocation, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

import { AppSidebar } from "../components/app-sidebar"
import { Breadcrumbs } from "../components/breadbrumbs"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { authMeQueryOptions, logout } from "../lib/queries"
import { useStore } from "../store"

export const Route = createFileRoute("/_layout/_auth")({
	beforeLoad: async ({ context: { queryClient, store } }) => {
		try {
			const data = await queryClient.fetchQuery(authMeQueryOptions())

			if (data && !store.isLoggedIn) {
				store.reenter()
			}

			return data
		} catch {
			store.quit()

			await logout().then(() =>
				redirect({
					to: "/login",
					throw: true,
				}),
			)
		}
	},
	component: AuthRoute,
})

function AuthRoute() {
	const { paths } = useStore()
	const { pathname } = useLocation()
	const { store, queryClient } = Route.useRouteContext()
	const navigate = useNavigate()

	useEffect(() => {
		store.setPaths(pathname)
	}, [pathname])

	function handleExit() {
		store.quit()
		queryClient.invalidateQueries({ queryKey: ["auth"] })

		navigate({ to: "/" })
	}

	return (
		<>
			<SidebarProvider>
				<AppSidebar handleExit={handleExit} />
				<SidebarTrigger />
				<div className="flex w-full flex-col gap-6 p-1">
					<Breadcrumbs breadcrumbs={paths?.links} current={paths?.current} />
					<main className="flex w-[98%] items-center justify-baseline text-xs md:w-[80%] md:text-sm">
						<Outlet />
					</main>
				</div>
			</SidebarProvider>
		</>
	)
}
