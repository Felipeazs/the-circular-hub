import { useMutation } from "@tanstack/react-query"
import { Link, useLocation } from "@tanstack/react-router"
import { BarChart3, Home, LogOut, PlusCircle, Settings } from "lucide-react"

import { logout } from "../lib/queries"
import { cn } from "../lib/utils"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar"

const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: Home,
	},
	{
		title: "Mis Resultados",
		url: "/resultados",
		icon: BarChart3,
	},
	{
		title: "Nueva Evaluación",
		url: "/evaluacion",
		icon: PlusCircle,
	},
	{
		title: "Ajustes",
		url: "/ajustes",
		icon: Settings,
	},
]

export function AppSidebar({ handleExit }: { handleExit: () => void }) {
	const { pathname } = useLocation()

	const { mutate } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			handleExit()
		},
	})

	function handleLogout() {
		mutate()
	}

	return (
		<Sidebar className="bg-slate-50 p-4">
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroupLabel>The circular hub</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem className="grid w-full gap-2">
							{items.map((item) => (
								<SidebarMenuButton
									key={item.title}
									className={cn(
										"w-full justify-start",
										pathname === item.url && "bg-muted font-medium",
									)}
									variant={pathname === item.url ? "outline" : "default"}
									asChild>
									<Link to={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							))}
							<SidebarMenuButton
								variant="outline"
								onClick={handleLogout}
								className="justify-start bg-slate-50 text-red-500 hover:cursor-pointer hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/20">
								<LogOut className="mr-2 h-5 w-5" />
								Sign Out
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	)
}
