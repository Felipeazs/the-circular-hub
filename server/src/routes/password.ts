import { and, eq, gt, isNotNull } from "drizzle-orm"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import crypto from "node:crypto"

import db from "../db"
import {
	forgotPassSchema,
	resetPassSchema,
	resetPasswordTokenSchema,
	usuario as usuarioTable,
} from "../db/schemas"
import { ERROR_CODE } from "../lib/constants"
import { ForgotPass } from "../lib/providers/emails/forgot-pass"
import { FROM, resend } from "../lib/providers/resend"
import { zValidator } from "../lib/validator-wrapper"
import { env } from "../t3-env"
import { tryCatch } from "../utils/try-catch"

export default new Hono()
	.post("/forgot", zValidator("json", forgotPassSchema), async (c) => {
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
		const resetLink = `${env.ORIGIN_URL}/password/reset/?token=${resetToken}`

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
	.post(
		"/reset/:token",
		zValidator("json", resetPassSchema),
		zValidator("param", resetPasswordTokenSchema),
		async (c) => {
			const { token } = c.req.param()
			const { password, repeat_password } = c.req.valid("json")

			if (password !== repeat_password) {
				throw new HTTPException(ERROR_CODE.BAD_REQUEST, {
					message: "Las contraseñas deben coincidir",
				})
			}

			const hashedToken = crypto.createHash("sha256").update(token.toString()).digest("hex")

			const { data: hashedNewPassword, error: hashError } = await tryCatch(
				Bun.password.hash(password, {
					algorithm: "bcrypt",
					cost: 10,
				}),
			)
			if (hashError) {
				throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: hashError.message })
			}

			const { data: usuarioUpdated, error: dbUpdateError } = await tryCatch(
				db
					.update(usuarioTable)
					.set({
						password: hashedNewPassword,
						passwordResetToken: null,
						passwordResetExpires: null,
					})
					.where(
						and(
							isNotNull(usuarioTable.passwordResetToken),
							eq(usuarioTable.passwordResetToken, hashedToken),
							gt(usuarioTable.passwordResetExpires, new Date(Date.now())),
						),
					)
					.returning(),
			)
			if (dbUpdateError) {
				throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, {
					message: dbUpdateError.message,
				})
			}
			if (!usuarioUpdated[0]) {
				throw new HTTPException(ERROR_CODE.BAD_REQUEST, {
					message:
						"La contraseña no pudo modificarse, el tiempo de cambio expiró, por favor realice otra vez la petición de cambio de contraseña",
				})
			}

			return c.json({ status: "ok" }, 200)
		},
	)
