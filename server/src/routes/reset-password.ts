import { eq } from "drizzle-orm"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import crypto from "node:crypto"

import db from "../db"
import { resentSchema, usuario as usuarioTable } from "../db/schemas"
import { ERROR_CODE } from "../lib/constants"
import { ForgotPass } from "../lib/providers/emails/forgot-pass"
import { FROM, resend } from "../lib/providers/resend"
import { zValidator } from "../lib/validator-wrapper"
import { env } from "../t3-env"
import { tryCatch } from "../utils/try-catch"

export default new Hono().post("/forgot", zValidator("json", resentSchema), async (c) => {
	const { email } = c.req.valid("json")

	const { data: usuarioFound, error: dbUsuarioError } = await tryCatch(
		db.query.usuario.findFirst({ where: eq(usuarioTable.email, email) }),
	)
	if (dbUsuarioError) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbUsuarioError.message })
	}
	if (!usuarioFound) {
		throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "email no encontrado" })
	}

	const resetToken = crypto.randomBytes(32).toString("hex")
	const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
	const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000)

	// actualizar usuario
	const { data: _data, error: dbUpdateError } = await tryCatch(
		db
			.update(usuarioTable)
			.set({
				passwordResetToken,
				passwordResetExpires,
			})
			.where(eq(usuarioTable.email, email)),
	)
	if (dbUpdateError) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbUpdateError.message })
	}

	// crear link
	const resetLink = `${env.ORIGIN_URL}/reset/${resetToken}`

	// enviar correo al usuario con el link de reinicio
	const { data: _, error } = await resend.emails.send({
		from: FROM,
		to: email,
		subject: "cambio de contraseña",
		react: ForgotPass({ email, link: resetLink }),
	})

	if (error) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: error.message })
	}

	return c.json({ status: "ok" }, 200)
})
