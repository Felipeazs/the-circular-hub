import { createFileRoute } from "@tanstack/react-router"
import { DownloadIcon, LineChart } from "lucide-react"

import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs"

export const Route = createFileRoute("/_layout/_auth/resultados/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="w-[80%] space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">My Results</h1>
					<p className="text-muted-foreground mt-2">View and analyze your assessment results.</p>
				</div>
				<Button variant="outline" size="sm">
					<DownloadIcon className="mr-2 h-4 w-4" />
					Export Results
				</Button>
			</div>

			<Tabs defaultValue="recent">
				<TabsList>
					<TabsTrigger value="recent">Recent</TabsTrigger>
					<TabsTrigger value="all">All Results</TabsTrigger>
					<TabsTrigger value="trends">Trends</TabsTrigger>
				</TabsList>
				<TabsContent value="recent" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Health Assessment</CardTitle>
							<CardDescription>Completed 1 day ago</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<p className="text-muted-foreground text-sm font-medium">Overall Score</p>
										<p className="text-2xl font-bold">82%</p>
									</div>
									<div className="space-y-2">
										<p className="text-muted-foreground text-sm font-medium">Questions Answered</p>
										<p className="text-2xl font-bold">26/26</p>
									</div>
								</div>

								<div className="space-y-4">
									<h3 className="font-medium">Category Breakdown</h3>
									{[
										{ name: "Personal Information", score: 75 },
										{ name: "Health & Wellness", score: 80 },
										{ name: "Work & Career", score: 60 },
										{ name: "Relationships", score: 100 },
										{ name: "Lifestyle", score: 75 },
										{ name: "Goals & Aspirations", score: 100 },
									].map((category) => (
										<div key={category.name} className="space-y-1">
											<div className="flex items-center justify-between">
												<p className="text-sm">{category.name}</p>
												<p className="text-sm font-medium">{category.score}%</p>
											</div>
											<div className="bg-muted h-2 w-full rounded-full">
												<div
													className="bg-primary h-2 rounded-full"
													style={{ width: `${category.score}%` }}
												/>
											</div>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="all">
					<Card>
						<CardHeader>
							<CardTitle>All Assessment Results</CardTitle>
							<CardDescription>View all your past assessments</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{[
									{ name: "Health Assessment", date: "May 1, 2025", score: 82, id: 1 },
									{ name: "Career Evaluation", date: "April 28, 2025", score: 76, id: 2 },
									{ name: "Personal Growth", date: "April 25, 2025", score: 68, id: 3 },
									{ name: "Lifestyle Assessment", date: "March 15, 2025", score: 72, id: 4 },
									{ name: "Relationship Survey", date: "February 10, 2025", score: 85, id: 5 },
								].map((assessment) => (
									<div
										key={assessment.id}
										className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
										<div>
											<p className="font-medium">{assessment.name}</p>
											<p className="text-muted-foreground text-sm">
												Completed on
												{assessment.date}
											</p>
										</div>
										<div className="flex items-center gap-4">
											<div className="text-right">
												<p className="font-medium">{assessment.score}%</p>
												<p className="text-muted-foreground text-sm">Score</p>
											</div>
											<Button variant="outline" size="sm">
												View
											</Button>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="trends">
					<Card>
						<CardHeader>
							<CardTitle>Progress Trends</CardTitle>
							<CardDescription>Track your progress over time</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
								<div className="flex flex-col items-center gap-2 text-center">
									<LineChart className="text-muted-foreground h-8 w-8" />
									<h3 className="text-lg font-medium">Progress Chart</h3>
									<p className="text-muted-foreground text-sm">
										Your progress visualization would appear here
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
