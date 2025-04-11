import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router"
import { useEffect } from "react"

import { Login } from "@/client/components/login"

import { AppSidebar } from "../../components/app-sidebar"
import { Breadcrumbs } from "../../components/breadbrumbs"
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { authMeQueryOptions } from "../../lib/queries"
import { useStore } from "../../store"

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

			return { usuario: null }
		}
	},
	component: AuthRoute,
})

function AuthRoute() {
	const { paths } = useStore()
	const { pathname } = useLocation()
	const { store, usuario } = Route.useRouteContext()

	useEffect(() => {
		store.setPaths(pathname)
	}, [pathname])

	if (!usuario) {
		return <Login />
	}

	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<SidebarTrigger />
				<div className="flex w-full flex-col gap-6 p-1">
					<Breadcrumbs breadcrumbs={paths?.links} current={paths?.current} />
					<main className="flex w-[98%] items-center text-xs md:justify-center lg:w-[80%] lg:justify-start lg:text-sm 2xl:w-[60%]">
						<Outlet />
					</main>
				</div>
			</SidebarProvider>
		</>
	)
}
