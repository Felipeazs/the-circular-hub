import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

import type { AppEnv } from "../lib/types"

import db from "../db"
import { respuestasSchema, respuesta as respuestaTable } from "../db/schemas"
import { ERROR_CODE } from "../lib/constants"
import { zValidator } from "../lib/validator-wrapper"
import { checkAuth } from "../middlewares/auth"
import rateLimit from "../middlewares/rate-limit"
import { tryCatch } from "../utils/try-catch"

export default new Hono<AppEnv>()
	.get("/", (c) => {
		console.warn("get respuestas")
		return c.json({ status: "ok" }, 200)
	})
	.post("/", zValidator("json", respuestasSchema), rateLimit, checkAuth, async (c) => {
		const usuario = c.get("usuario")
		const respuestas = c.req.valid("json")

		const { data: _nuevas_respuestas, error: dbError } = await tryCatch(
			db
				.insert(respuestaTable)
				.values({
					usuarioId: usuario.id,
					...respuestas,
				})
				.returning(),
		)
		if (dbError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbError.message })
		}

		return c.json({ status: "ok" }, 200)
	})
