import { Eye, EyeOff } from "lucide-react"
import { useRef, useState } from "react"

import { useFieldContext } from "@/client/hooks/form"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import FieldInfo from "./field-info"

type TextFieldProps = {
	label: string
	type?: "text" | "password"
	placeholder?: string
}

export function TextField({ label, type = "text", placeholder }: TextFieldProps) {
	const field = useFieldContext<string>()
	const [eyeIsOn, setEyeIsOn] = useState<boolean>(false)
	const [isType, setIsType] = useState<string>(type)
	const inputRef = useRef(null)

	function handleEye() {
		// cambiar type de input a text
		!eyeIsOn ? setIsType("text") : setIsType("password")

		// cambiar icono a Eye
		setEyeIsOn((previous) => !previous)
	}

	return (
		<label className="space-y-2">
			<Label>{label}</Label>
			<div className="flex items-center gap-2 hover:cursor-pointer">
				<Input
					ref={inputRef}
					type={isType}
					name={field.name}
					value={field.state.value}
					onBlur={field.handleBlur}
					onChange={(e) => field.handleChange(e.target.value)}
					autoComplete="off"
					placeholder={placeholder}
				/>
				{type === "password" && !eyeIsOn && <EyeOff onClick={handleEye} />}
				{type === "password" && eyeIsOn && <Eye onClick={handleEye} />}
			</div>
			<FieldInfo field={field} />
		</label>
	)
}
