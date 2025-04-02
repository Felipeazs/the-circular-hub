import { createFileRoute } from "@tanstack/react-router"

import { Login } from "../components/login"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export const Route = createFileRoute("/_layout/login")({
	component: About,
})

export function About() {
	return (
		<Card className="mx-auto mt-20 w-max">
			<CardHeader>
				<CardTitle>Log in</CardTitle>
			</CardHeader>
			<CardContent>
				<Login />
			</CardContent>
		</Card>
	)
}
