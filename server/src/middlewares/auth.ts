import { eq } from "drizzle-orm"
import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"
import { verify } from "hono/jwt"

import type { EnvUsuario } from "../lib/types"

import db from "../db"
import { usuario as usuarioTable } from "../db/schemas"
import { ERROR_CODE, ERROR_MESSAGE } from "../lib/constants"
import { env } from "../t3-env"
import { tryCatch } from "../utils/try-catch"

export const checkAuth = createMiddleware(async (c, next) => {
	const access_token = c.req.header("Authorization")

	if (!access_token) {
		throw new HTTPException(ERROR_CODE.FORBIDDEN, {
			message: ERROR_MESSAGE.FORBIDDEN,
		})
	}

	const token = access_token.split(" ")[1]
	if (!token) {
		throw new HTTPException(ERROR_CODE.FORBIDDEN, {
			message: ERROR_MESSAGE.FORBIDDEN,
		})
	}

	const { data: verified_access, error } = await tryCatch(verify(token, env.JWT_ACCESS_SECRET))
	if (error || !verified_access) {
		throw new HTTPException(ERROR_CODE.UNAUTHORIZED, {
			message: ERROR_MESSAGE.UNAUTHORIZED,
		})
	}

	const usuario = verified_access.usuario as EnvUsuario

	const { data: usuarioFound, error: dbUsuarioError } = await tryCatch(
		db.query.usuario.findFirst({ where: eq(usuarioTable.id, usuario.id) }),
	)
	if (dbUsuarioError) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbUsuarioError.message })
	}
	if (!usuarioFound) {
		throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "usuario no encontrado" })
	}

	c.set("usuario", usuario)

	await next()
})
