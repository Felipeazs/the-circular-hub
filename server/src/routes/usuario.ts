import { eq } from "drizzle-orm"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { Buffer } from "node:buffer"
import SuperJSON from "superjson"

import type { AppEnv } from "../lib/types"

import db from "../db"
import { editUsuarioSchema, usuario as usuarioTable } from "../db/schemas"
import { ERROR_CODE } from "../lib/constants"
import { deleteImage, uploadImage } from "../lib/providers/cloudinary"
import { deleteRedisItem, getRedisItem, setRedisItem } from "../lib/redis"
import { zValidator } from "../lib/validator-wrapper"
import { checkAuth } from "../middlewares/auth"
import rateLimit from "../middlewares/rate-limit"
import { restrict } from "../middlewares/restrict"
import { tryCatch } from "../utils/try-catch"

const app = new Hono<AppEnv>()
	// get me
	.get("/", rateLimit, checkAuth, restrict("super_admin", "admin", "user"), async (c) => {
		const usuario = c.get("usuario")

		const { data: redisItem, error: redisError } = await tryCatch(
			getRedisItem({ item: "usuario", key: usuario!.id }),
		)
		if (redisError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: redisError.message })
		}
		if (redisItem) {
			return c.json({ usuario: redisItem }, 200)
		}

		const id = usuario!.id

		const { data: usuarioFound, error: dbError } = await tryCatch(
			db.query.usuario.findFirst({ where: eq(usuarioTable.id, id) }),
		)
		if (dbError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbError.message })
		}
		if (!usuarioFound) {
			throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "usuario no encontrado" })
		}

		const sjson = SuperJSON.stringify(usuarioFound)

		await setRedisItem({ item: "usuario", key: usuario!.id, value: sjson })

		return c.json({ usuario: sjson }, 200)
	})
	// edit me
	.put(
		"/edit",
		zValidator("form", editUsuarioSchema),
		rateLimit,
		checkAuth,
		restrict("super_admin", "admin", "user"),
		async (c) => {
			const usuario = c.get("usuario")

			const { nombre, apellido, email, organizacion, roles, image } = c.req.valid("form")

			let dbimage = image
			if (image instanceof File) {
				const arrayBuf = await image.arrayBuffer()
				const buffer = Buffer.from(arrayBuf).toString("base64")
				const { data: cloud, error } = await tryCatch(uploadImage(buffer!, usuario!.id, "profile"))
				if (error) {
					throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: error.message })
				}

				dbimage = cloud.secure_url
			}

			const { data: usuarioFound, error: dbUpdateError } = await tryCatch(
				db
					.update(usuarioTable)
					.set({
						nombre,
						apellido,
						email,
						organizacion,
						roles: typeof roles === "string" ? ["user"] : roles,
						image: dbimage as string,
					})
					.where(eq(usuarioTable.id, usuario!.id)),
			)
			if (dbUpdateError) {
				throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, {
					message: dbUpdateError.message,
				})
			}
			if (!usuarioFound) {
				throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "usuario no encontrado" })
			}

			const { data: _data, error: redisDelError } = await tryCatch(
				deleteRedisItem({ item: "usuario", key: usuario!.id }),
			)
			if (redisDelError) {
				throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, {
					message: redisDelError.message,
				})
			}

			return c.json({ status: "ok" }, 200)
		},
	)
	.delete("/delete", rateLimit, checkAuth, restrict("super_admin", "admin", "user"), async (c) => {
		const usuario = c.get("usuario")

		const { data, error } = await tryCatch(
			db.delete(usuarioTable).where(eq(usuarioTable.id, usuario!.id)).returning(),
		)
		if (error) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, {
				message: error.message,
			})
		}
		if (!data[0]) {
			throw new HTTPException(ERROR_CODE.NOT_FOUND, {
				message: "No se puedo eliminar el usuario",
			})
		}

		const { data: _cloud, error: cloudError } = await tryCatch(deleteImage(usuario!.id, "profile"))
		if (cloudError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: cloudError.message })
		}

		return c.json({ status: "ok" }, 200)
	})

export default app
