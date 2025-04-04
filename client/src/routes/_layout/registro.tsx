import { createFileRoute } from "@tanstack/react-router"

import { Signup } from "../../components/signup"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export const Route = createFileRoute("/_layout/registro")({
	component: RouteComponent,
})

export function RouteComponent() {
	return (
		<Card className="mx-auto mt-20 w-max">
			<CardHeader>
				<CardTitle>Regístrate</CardTitle>
			</CardHeader>
			<CardContent>
				<Signup />
			</CardContent>
		</Card>
	)
}
