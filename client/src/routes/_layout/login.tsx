import { createFileRoute } from "@tanstack/react-router"

import { Login } from "../../components/login"

export const Route = createFileRoute("/_layout/login")({
	component: RouteComponent,
})

export function RouteComponent() {
	return <Login />
}
