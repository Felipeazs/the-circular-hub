import { createFileRoute, Link } from "@tanstack/react-router"
import { BarChart3, CheckCircle, Clock, PlusCircle } from "lucide-react"

import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"

export const Route = createFileRoute("/_layout/_auth/_usuario/dashboard/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="w-[80%] space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
				<p className="text-muted-foreground mt-2">
					Welcome back! Here's an overview of your assessments.
				</p>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Completed Assessments</CardTitle>
						<CheckCircle className="text-muted-foreground h-4 w-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">3</div>
						<p className="text-muted-foreground mt-1 text-xs">+1 from last month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">In Progress</CardTitle>
						<Clock className="text-muted-foreground h-4 w-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1</div>
						<p className="text-muted-foreground mt-1 text-xs">Last updated 2 days ago</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Average Score</CardTitle>
						<BarChart3 className="text-muted-foreground h-4 w-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">76%</div>
						<p className="text-muted-foreground mt-1 text-xs">+12% from previous</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card className="col-span-1">
					<CardHeader>
						<CardTitle>Recent Assessments</CardTitle>
						<CardDescription>Your most recently completed assessments</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{ name: "Health Assessment", id: 1 },
								{ name: "Career Evaluation", id: 2 },
								{ name: "Personal Growth", id: 3 },
							].map((assessment, i) => (
								<div
									key={assessment.id}
									className="flex items-center justify-between border-b pb-2 last:border-0">
									<div>
										<p className="font-medium">{assessment.name}</p>
										<p className="text-muted-foreground text-sm">
											Completed
											{i + 1}
											{i === 0 ? "day" : "days"}
											ago
										</p>
									</div>
									<Button variant="outline" size="sm" asChild>
										<Link to="/resultados/$id" params={{ id: String(i) }}>
											View
										</Link>
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="col-span-1">
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
						<CardDescription>Start a new assessment or view your results</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button className="w-full" asChild>
							<Link to="/evaluacion">
								<PlusCircle className="mr-2 h-4 w-4" />
								Start New Assessment
							</Link>
						</Button>
						<Button variant="outline" className="w-full" asChild>
							<Link to="/resultados">
								<BarChart3 className="mr-2 h-4 w-4" />
								View All Results
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
