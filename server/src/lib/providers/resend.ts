import { HTTPException } from "hono/http-exception"
import { type CreateEmailResponseSuccess, Resend } from "resend"

import { env } from "../../t3-env"
import { ERROR_CODE, ERROR_MESSAGE } from "../constants"

export const resend = new Resend(env.RESEND_API_KEY)

export const FROM = "Acme <onboarding@resend.dev>"

export async function enviarEmail({
	to,
	subject,
	template,
}: {
	to: string
	subject: string
	template: React.ReactNode
}): Promise<CreateEmailResponseSuccess | null> {
	const { data, error } = await resend.emails.send({
		from: FROM,
		to,
		subject,
		react: template,
	})

	if (error) {
		throw new HTTPException(ERROR_CODE.BAD_REQUEST, { message: ERROR_MESSAGE.BAD_REQUEST })
	}

	return data
}
