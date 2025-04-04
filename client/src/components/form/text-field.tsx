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
	return (
		<label className="space-y-2">
			<Label>{label}</Label>
			<Input
				type={type}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				autoComplete="off"
				placeholder={placeholder}
			/>
			<FieldInfo field={field} />
		</label>
	)
}
