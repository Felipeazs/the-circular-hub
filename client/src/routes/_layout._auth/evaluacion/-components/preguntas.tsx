import { useState } from "react"

import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Label } from "@/client/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/client/components/ui/radio-group"
import { cn } from "@/client/lib/utils"

// Define the question structure
type Question = {
	id: string
	text: string
	category: string
}

// Define the categories and questions
const categories = [
	{
		id: "personal",
		title: "Personal Information",
		description: "Questions about your personal habits and preferences",
	},
	{
		id: "health",
		title: "Health & Wellness",
		description: "Questions about your health and wellness habits",
	},
	{
		id: "work",
		title: "Work & Career",
		description: "Questions about your work environment and career",
	},
	{
		id: "relationships",
		title: "Relationships",
		description: "Questions about your personal relationships",
	},
	{
		id: "lifestyle",
		title: "Lifestyle",
		description: "Questions about your daily lifestyle choices",
	},
	{
		id: "goals",
		title: "Goals & Aspirations",
		description: "Questions about your future goals and aspirations",
	},
]

// Create questions for each category (26 total)
const questions: Question[] = [
	// Personal Information (4 questions)
	{ id: "personal_1", text: "Do you consider yourself an organized person?", category: "personal" },
	{ id: "personal_2", text: "Do you enjoy spending time alone?", category: "personal" },
	{ id: "personal_3", text: "Are you comfortable speaking in public?", category: "personal" },
	{ id: "personal_4", text: "Do you consider yourself a morning person?", category: "personal" },

	// Health & Wellness (5 questions)
	{
		id: "health_1",
		text: "Do you exercise regularly (at least 3 times a week)?",
		category: "health",
	},
	{ id: "health_2", text: "Do you maintain a balanced diet?", category: "health" },
	{ id: "health_3", text: "Do you get at least 7 hours of sleep most nights?", category: "health" },
	{
		id: "health_4",
		text: "Do you practice any form of mindfulness or meditation?",
		category: "health",
	},
	{ id: "health_5", text: "Do you have regular health check-ups?", category: "health" },

	// Work & Career (5 questions)
	{ id: "work_1", text: "Are you satisfied with your current job/career?", category: "work" },
	{ id: "work_2", text: "Do you feel your work is valued by others?", category: "work" },
	{ id: "work_3", text: "Do you have a good work-life balance?", category: "work" },
	{
		id: "work_4",
		text: "Are you pursuing opportunities for professional growth?",
		category: "work",
	},
	{
		id: "work_5",
		text: "Do you have clear career goals for the next five years?",
		category: "work",
	},

	// Relationships (4 questions)
	{
		id: "relationships_1",
		text: "Do you have close friends you can confide in?",
		category: "relationships",
	},
	{
		id: "relationships_2",
		text: "Do you maintain regular contact with family members?",
		category: "relationships",
	},
	{
		id: "relationships_3",
		text: "Are you satisfied with your social life?",
		category: "relationships",
	},
	{
		id: "relationships_4",
		text: "Do you find it easy to trust others?",
		category: "relationships",
	},

	// Lifestyle (4 questions)
	{
		id: "lifestyle_1",
		text: "Do you engage in hobbies or activities you enjoy regularly?",
		category: "lifestyle",
	},
	{
		id: "lifestyle_2",
		text: "Do you take time to relax and unwind each day?",
		category: "lifestyle",
	},
	{
		id: "lifestyle_3",
		text: "Do you limit screen time (TV, phone, computer) in your daily life?",
		category: "lifestyle",
	},
	{ id: "lifestyle_4", text: "Do you spend time outdoors regularly?", category: "lifestyle" },

	// Goals & Aspirations (4 questions)
	{
		id: "goals_1",
		text: "Do you have specific personal goals you're working toward?",
		category: "goals",
	},
	{ id: "goals_2", text: "Do you regularly learn new skills or knowledge?", category: "goals" },
	{
		id: "goals_3",
		text: "Do you have financial goals and a plan to achieve them?",
		category: "goals",
	},
	{
		id: "goals_4",
		text: "Do you feel you're making progress toward your life goals?",
		category: "goals",
	},
]

// Initialize empty answers object
type Answers = {
	[key: string]: "yes" | "no" | null
}

const initializeAnswers = (): Answers => {
	const initialAnswers: Answers = {}
	questions.forEach((question) => {
		initialAnswers[question.id] = null
	})
	return initialAnswers
}
export function Preguntas({ saveForm }: { saveForm: (answers: Answers) => void }) {
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
	const [answers, setAnswers] = useState<Answers>(initializeAnswers())
	const [showSummary, setShowSummary] = useState(false)

	const currentCategory = categories[currentCategoryIndex]
	const categoryQuestions = questions.filter((q) => q.category === currentCategory?.id)

	const handleAnswerChange = (questionId: string, value: "yes" | "no") => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: value,
		}))
	}

	const nextCategory = () => {
		if (currentCategoryIndex < categories.length - 1) {
			setCurrentCategoryIndex(currentCategoryIndex + 1)
			window.scrollTo(0, 0)
		} else {
			setShowSummary(true)
			window.scrollTo(0, 0)
		}
	}

	const prevCategory = () => {
		setShowSummary(false)
		if (currentCategoryIndex > 0) {
			setCurrentCategoryIndex(currentCategoryIndex - 1)
			window.scrollTo(0, 0)
		}
	}

	const resetForm = () => {
		setAnswers(initializeAnswers())
		setCurrentCategoryIndex(0)
		setShowSummary(false)
		window.scrollTo(0, 0)
	}

	const handleSaveForm = () => {
		saveForm(answers)
	}

	const isCurrentCategoryComplete = () => {
		return categoryQuestions.every((question) => answers[question.id] !== null)
	}

	const getCategoryCompletionStatus = (categoryId: string) => {
		const categoryQuestions = questions.filter((q) => q.category === categoryId)
		const answeredQuestions = categoryQuestions.filter((q) => answers[q.id] !== null)
		return {
			total: categoryQuestions.length,
			answered: answeredQuestions.length,
			isComplete: categoryQuestions.length === answeredQuestions.length,
		}
	}

	const renderCategoryQuestions = () => {
		return (
			<>
				<CardHeader>
					<CardTitle>{currentCategory.title}</CardTitle>
					<CardDescription>{currentCategory.description}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{categoryQuestions.map((question, index) => (
						<div key={question.id} className="space-y-2">
							<p className="font-medium">
								{index + 1}. {question.text}
							</p>
							<RadioGroup
								value={answers[question.id] || ""}
								onValueChange={(value) => handleAnswerChange(question.id, value as "yes" | "no")}
								className="flex space-x-4">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="yes" id={`${question.id}-yes`} />
									<Label htmlFor={`${question.id}-yes`}>Yes</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="no" id={`${question.id}-no`} />
									<Label htmlFor={`${question.id}-no`}>No</Label>
								</div>
							</RadioGroup>
						</div>
					))}
				</CardContent>
			</>
		)
	}

	const renderSummary = () => {
		return (
			<>
				<CardHeader>
					<CardTitle>Summary of Your Responses</CardTitle>
					<CardDescription>Review your answers to all questions</CardDescription>
				</CardHeader>
				<CardContent className="space-y-8">
					{categories.map((category) => {
						const categoryQuestions = questions.filter((q) => q.category === category.id)
						return (
							<div key={category.id} className="space-y-4">
								<h3 className="border-b pb-2 text-lg font-semibold">{category.title}</h3>
								<div className="space-y-3">
									{categoryQuestions.map((question) => (
										<div key={question.id} className="grid grid-cols-12 gap-2">
											<div className="col-span-9 text-sm">{question.text}</div>
											<div className="col-span-3 text-sm font-medium">
												{answers[question.id] === "yes" ? (
													<span className="text-green-600">Yes</span>
												) : answers[question.id] === "no" ? (
													<span className="text-red-600">No</span>
												) : (
													<span className="text-gray-400">Not answered</span>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						)
					})}

					<div className="bg-muted mt-6 rounded-lg p-4">
						<p className="text-center text-sm">Thank you for completing our questionnaire!</p>
					</div>
				</CardContent>
			</>
		)
	}
	return (
		<div className="mx-auto w-full max-w-3xl">
			{!showSummary && (
				<div className="mb-6">
					<div className="mb-2 flex items-center justify-between">
						<p className="text-muted-foreground text-sm">
							Category {currentCategoryIndex + 1} of {categories.length}
						</p>
						<p className="text-sm font-medium">
							{Math.round((currentCategoryIndex / categories.length) * 100)}% Complete
						</p>
					</div>
					<div className="bg-muted h-2 w-full rounded-full">
						<div
							className="bg-primary h-2 rounded-full transition-all duration-300"
							style={{ width: `${(currentCategoryIndex / categories.length) * 100}%` }}
						/>
					</div>
				</div>
			)}

			{!showSummary && (
				<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
					{categories.map((category, index) => {
						const status = getCategoryCompletionStatus(category.id)
						return (
							<button
								type="button"
								key={category.id}
								onClick={() => !showSummary && setCurrentCategoryIndex(index)}
								className={cn(
									"rounded-lg border p-3 text-left transition-colors",
									currentCategoryIndex === index && !showSummary
										? "border-primary bg-primary/5"
										: "border-muted bg-background hover:bg-muted/50",
									status.isComplete && "border-green-500/30 bg-green-50 dark:bg-green-950/20",
								)}
								disabled={showSummary}>
								<div className="truncate text-sm font-medium">{category.title}</div>
								<div className="text-muted-foreground mt-1 text-xs">
									{status.answered}/{status.total} answered
								</div>
							</button>
						)
					})}
				</div>
			)}

			<Card className="w-full">
				{showSummary ? renderSummary() : renderCategoryQuestions()}

				<CardFooter className="flex justify-between pt-6">
					{!showSummary ? (
						<>
							<Button
								variant="outline"
								onClick={prevCategory}
								disabled={currentCategoryIndex === 0}>
								Previous
							</Button>
							<Button onClick={nextCategory} disabled={!isCurrentCategoryComplete()}>
								{currentCategoryIndex === categories.length - 1 ? "View Summary" : "Next"}
							</Button>
						</>
					) : (
						<>
							<Button
								variant="outline"
								onClick={prevCategory}
								disabled={currentCategoryIndex === 0}
								className="mx-auto">
								Editar
							</Button>
							<Button variant="outline" onClick={handleSaveForm} className="mx-auto">
								Guardar
							</Button>
							<Button variant="outline" onClick={resetForm} className="mx-auto">
								Reiniciar
							</Button>
						</>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}
