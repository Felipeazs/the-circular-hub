import { createFileRoute } from "@tanstack/react-router"

import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Input } from "@/client/components/ui/input"
import { Label } from "@/client/components/ui/label"
import { Switch } from "@/client/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs"

export const Route = createFileRoute("/_layout/_auth/_usuario/ajustes/")({
	component: RouteComponent,
})

function RouteComponent() {
	// const { usuario: usuarioCtx } = Route.useRouteContext()
	// const { usuario: usuarioData } = useStore()

	// return (
	// 	usuarioData &&
	// 	usuarioCtx && (
	// 		<div className="w-[80%] space-y-8">
	// 			<UsuarioCard data={usuarioData} ctx={usuarioCtx} />
	// 		</div>
	// 	)
	// )

	return (
		<div className="w-[80%] space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Settings</h1>
				<p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
			</div>

			<Tabs defaultValue="profile">
				<TabsList>
					<TabsTrigger value="profile">Profile</TabsTrigger>
					<TabsTrigger value="notifications">Notifications</TabsTrigger>
					<TabsTrigger value="privacy">Privacy</TabsTrigger>
				</TabsList>
				<TabsContent value="profile" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Profile Information</CardTitle>
							<CardDescription>Update your personal information</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="first-name">First name</Label>
									<Input id="first-name" defaultValue="John" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="last-name">Last name</Label>
									<Input id="last-name" defaultValue="Doe" />
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" defaultValue="john.doe@example.com" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="bio">Bio</Label>
								<Input id="bio" defaultValue="Software developer and health enthusiast" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Save Changes</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Password</CardTitle>
							<CardDescription>Update your password</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="current-password">Current password</Label>
								<Input id="current-password" type="password" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="new-password">New password</Label>
								<Input id="new-password" type="password" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirm-password">Confirm password</Label>
								<Input id="confirm-password" type="password" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Change Password</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="notifications" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Notification Preferences</CardTitle>
							<CardDescription>Manage how you receive notifications</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between space-y-0">
								<div className="space-y-0.5">
									<Label htmlFor="email-notifications">Email Notifications</Label>
									<p className="text-muted-foreground text-sm">Receive notifications via email</p>
								</div>
								<Switch id="email-notifications" defaultChecked />
							</div>
							<div className="flex items-center justify-between space-y-0">
								<div className="space-y-0.5">
									<Label htmlFor="assessment-reminders">Assessment Reminders</Label>
									<p className="text-muted-foreground text-sm">
										Get reminders to complete assessments
									</p>
								</div>
								<Switch id="assessment-reminders" defaultChecked />
							</div>
							<div className="flex items-center justify-between space-y-0">
								<div className="space-y-0.5">
									<Label htmlFor="result-notifications">Results Available</Label>
									<p className="text-muted-foreground text-sm">
										Get notified when new results are available
									</p>
								</div>
								<Switch id="result-notifications" defaultChecked />
							</div>
							<div className="flex items-center justify-between space-y-0">
								<div className="space-y-0.5">
									<Label htmlFor="marketing-emails">Marketing Emails</Label>
									<p className="text-muted-foreground text-sm">
										Receive marketing and promotional emails
									</p>
								</div>
								<Switch id="marketing-emails" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Save Preferences</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="privacy" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Privacy Settings</CardTitle>
							<CardDescription>Manage your privacy preferences</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between space-y-0">
								<div className="space-y-0.5">
									<Label htmlFor="data-sharing">Data Sharing</Label>
									<p className="text-muted-foreground text-sm">
										Allow anonymous data sharing for research
									</p>
								</div>
								<Switch id="data-sharing" defaultChecked />
							</div>
							<div className="flex items-center justify-between space-y-0">
								<div className="space-y-0.5">
									<Label htmlFor="profile-visibility">Profile Visibility</Label>
									<p className="text-muted-foreground text-sm">
										Make your profile visible to other users
									</p>
								</div>
								<Switch id="profile-visibility" />
							</div>
							<div className="flex items-center justify-between space-y-0">
								<div className="space-y-0.5">
									<Label htmlFor="result-sharing">Result Sharing</Label>
									<p className="text-muted-foreground text-sm">
										Allow sharing of your assessment results
									</p>
								</div>
								<Switch id="result-sharing" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Save Privacy Settings</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Data Management</CardTitle>
							<CardDescription>Manage your account data</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<h3 className="font-medium">Export Data</h3>
								<p className="text-muted-foreground text-sm">
									Download a copy of all your data and assessment results
								</p>
								<Button variant="outline" size="sm">
									Export All Data
								</Button>
							</div>

							<div className="space-y-2">
								<h3 className="font-medium">Delete Account</h3>
								<p className="text-muted-foreground text-sm">
									Permanently delete your account and all associated data
								</p>
								<Button variant="destructive" size="sm">
									Delete Account
								</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
