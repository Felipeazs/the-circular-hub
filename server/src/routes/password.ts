import { and, eq, gt, isNotNull } from "drizzle-orm"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import crypto from "node:crypto"

import type { AppEnv } from "../lib/types"

import db from "../db"
import {
	changePassSchema,
	forgotPassSchema,
	resetPassSchema,
	resetPassTokenSchema,
	usuario as usuarioTable,
} from "../db/schemas"
import { ERROR_CODE } from "../lib/constants"
import { ForgotPass } from "../lib/providers/emails/forgot-pass"
import { FROM, resend } from "../lib/providers/resend"
import { zValidator } from "../lib/validator-wrapper"
import { checkAuth } from "../middlewares/auth"
import rateLimit from "../middlewares/rate-limit"
import { env } from "../t3-env"
import { tryCatch } from "../utils/try-catch"

export default new Hono<AppEnv>()
	.post("/forgot", rateLimit, zValidator("json", forgotPassSchema), async (c) => {
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
		rateLimit,
		zValidator("json", resetPassSchema),
		zValidator("param", resetPassTokenSchema),
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
	.put("/change", rateLimit, checkAuth, zValidator("json", changePassSchema), async (c) => {
		const usuario = c.get("usuario")
		const { password, new_password, repeat_new_password } = c.req.valid("json")

		if (new_password !== repeat_new_password) {
			throw new HTTPException(ERROR_CODE.BAD_REQUEST, {
				message: "Las contraseñas deben coincidir",
			})
		}

		// compare password with db
		const { data: usuarioEncontrado, error: dbError } = await tryCatch(
			db.query.usuario.findFirst({ where: eq(usuarioTable.id, usuario!.id) }),
		)
		if (dbError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbError.message })
		}

		if (!usuarioEncontrado) {
			throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "Usuario no registrado" })
		}

		const { data: passValidado, error: passError } = await tryCatch(
			Bun.password.verify(password, usuarioEncontrado.password),
		)
		if (passError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: passError.message })
		}

		if (!passValidado) {
			throw new HTTPException(ERROR_CODE.FORBIDDEN, {
				message: "La contraseña actual es incorrecta",
			})
		}

		// hash new password
		const { data: hashedPassword, error: hashError } = await tryCatch(
			Bun.password.hash(new_password, {
				algorithm: "bcrypt",
				cost: 10,
			}),
		)
		if (hashError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: hashError.message })
		}
		// save new password
		const { data: password_updated, error: dbUpdateError } = await tryCatch(
			db
				.update(usuarioTable)
				.set({
					password: hashedPassword,
				})
				.returning(),
		)
		if (dbUpdateError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbUpdateError.message })
		}

		if (!password_updated) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, {
				message: "No pudimos actualizar su contraseña, por favor inténtelo más tarde",
			})
		}

		return c.json({ status: "ok" }, 200)
	})
