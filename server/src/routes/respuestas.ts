import { and, desc, eq } from "drizzle-orm"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import SuperJSON from "superjson"

import type { AppEnv } from "../lib/types"

import db from "../db"
import { createRespuestasSchema, respuesta as respuestaTable } from "../db/schemas"
import { ERROR_CODE } from "../lib/constants"
import { zValidator } from "../lib/validator-wrapper"
import { checkAuth } from "../middlewares/auth"
import rateLimit from "../middlewares/rate-limit"
import { tryCatch } from "../utils/try-catch"

export default new Hono<AppEnv>()
	.get("/", checkAuth, async (c) => {
		const usuario = c.get("usuario")

		const { data, error: dbError } = await tryCatch(
			db.query.respuesta.findMany({
				where: eq(respuestaTable.usuarioId, usuario!.id),
				orderBy: desc(respuestaTable.createdAt),
			}),
		)
		if (dbError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbError.message })
		}
		if (!data) {
			throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "usuario no encontrado" })
		}

		const sjson = SuperJSON.stringify(data)

		return c.json({ respuestas: sjson }, 200)
	})
	.get("/:id", checkAuth, async (c) => {
		const usuario = c.get("usuario")
		const id = c.req.param("id")

		const { data, error: dbError } = await tryCatch(
			db.query.respuesta.findFirst({
				where: and(eq(respuestaTable.usuarioId, usuario!.id), eq(respuestaTable.id, id)),
			}),
		)
		if (dbError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbError.message })
		}
		if (!data) {
			throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "Resultado no encontrado" })
		}
		const sjson = SuperJSON.stringify(data)

		return c.json({ respuesta: sjson }, 200)
	})
	.post("/", zValidator("json", createRespuestasSchema), rateLimit, checkAuth, async (c) => {
		const usuario = c.get("usuario")
		const respuestas = c.req.valid("json")

		const { data: nuevas_respuestas, error: dbError } = await tryCatch(
			db
				.insert(respuestaTable)
				.values({
					usuarioId: usuario!.id,
					...respuestas,
				})
				.returning(),
		)
		if (dbError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbError.message })
		}
		if (!nuevas_respuestas[0]) {
			throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "Resultado no encontrado" })
		}

		const sjson = SuperJSON.stringify(nuevas_respuestas[0])

		return c.json({ respuesta: sjson }, 200)
	})
	.delete("/:id", checkAuth, async (c) => {
		const usuario = c.get("usuario")
		const id = c.req.param("id")

		const { data, error: dbError } = await tryCatch(
			db
				.delete(respuestaTable)
				.where(and(eq(respuestaTable.id, id), eq(respuestaTable.usuarioId, usuario!.id)))
				.returning(),
		)
		if (dbError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbError.message })
		}
		if (!data[0]) {
			throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "Resultado no encontrado" })
		}

		const sjson = SuperJSON.stringify(data[0])

		return c.json({ respuesta: sjson }, 200)
	})
