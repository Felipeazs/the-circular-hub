import { createFileRoute } from "@tanstack/react-router"

import { Login } from "../components/login"
import { Signup } from "../components/signup"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export const Route = createFileRoute("/_layout/about")({
	component: About,
})

export function About() {
	return (
		<div className="flex w-full justify-center gap-5 pt-5">
			<Card>
				<CardHeader>
					<CardTitle>Log in</CardTitle>
				</CardHeader>
				<CardContent>
					<Login />
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Regístrate</CardTitle>
				</CardHeader>
				<CardContent>
					<Signup />
				</CardContent>
			</Card>
		</div>
	)
}
