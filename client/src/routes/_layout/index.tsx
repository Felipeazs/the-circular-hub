import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRight, LineChart } from "lucide-react"

import { Button } from "../../components/ui/button"

export const Route = createFileRoute("/_layout/")({
	component: Index,
})

function Index() {
	return (
		<main className="flex-1">
			{/* Hero Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
				<div className="container px-4 md:px-6">
					<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
									Descubre tu camino hacia el crecimiento
								</h1>
								<p className="text-muted-foreground max-w-[600px] md:text-xl">
									Nuestra herramienta de evaluación integral lo ayuda a identificar fortalezas,
									áreas de mejora y crear una hoja de ruta para su empresa.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Button size="lg" asChild>
									<Link to="/evaluacion">
										Empieza tu evaluación
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
								<Button size="lg" variant="outline" asChild>
									<Link to="/panel">Ver Dashboard</Link>
								</Button>
							</div>
						</div>
						<div className="flex items-center justify-center">
							<div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
								<div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-3xl"></div>
								<div className="bg-background relative h-full w-full rounded-xl border p-4 shadow-xl">
									<div className="flex h-full w-full flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-6">
										<LineChart className="text-muted-foreground h-16 w-16" />
										<div className="space-y-2 text-center">
											<h3 className="font-bold">Asesoramiento personalizado</h3>
											<p className="text-muted-foreground text-sm">
												Obtenga análisis detallado y recomendaciones procesables basadas en sus
												respuestas.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
