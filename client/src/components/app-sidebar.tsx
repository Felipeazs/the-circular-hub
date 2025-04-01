import { Link, useLocation } from "@tanstack/react-router"
import * as lucideReact from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "./ui/button"
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
		icon: lucideReact.Home,
	},
	{
		title: "Mis Resultados",
		url: "/resultados",
		icon: lucideReact.BarChart3,
	},
	{
		title: "Nueva Evaluación",
		url: "/evaluacion",
		icon: lucideReact.PlusCircle,
	},
	{
		title: "Ajustes",
		url: "/ajustes",
		icon: lucideReact.Settings,
	},
]

export function AppSidebar() {
	const { pathname } = useLocation()

	return (
		<Sidebar className="bg-slate-50 p-4">
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroupLabel>Circula</SidebarGroupLabel>
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
							<SidebarMenuButton>
								<Button
									variant="ghost"
									className="justify-start text-red-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/20">
									<lucideReact.LogOut className="mr-2 h-5 w-5" />
									Sign Out
								</Button>
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
