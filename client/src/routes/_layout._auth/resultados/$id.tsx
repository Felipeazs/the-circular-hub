import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/_auth/resultados/$id")({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/_layout/_auth/resultados/"!</div>
}
