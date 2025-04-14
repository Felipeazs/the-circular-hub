import { Hono } from "hono"
import { deleteCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"

import type { AppEnv } from "../lib/types"

import { ERROR_CODE } from "../lib/constants"
import { deleteRedisItem, getRedisClient } from "../lib/redis"
import { checkAuth } from "../middlewares/auth"
import { tryCatch } from "../utils/try-catch"

export default new Hono<AppEnv>().post("/", checkAuth, async (c) => {
	const usuario = c.get("usuario")

	// eliminar redis usuario
	const { data: _redisUsuario, error: redisError } = await tryCatch(
		deleteRedisItem({ item: "usuario", key: usuario!.id }),
	)
	if (redisError) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: redisError.message })
	}

	const redis = getRedisClient()
	const { data: _redisTOken, error: redisTokenError } = await tryCatch(
		redis.del(`${usuario?.id}:refresh_token`),
	)
	if (redisTokenError) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: redisTokenError.message })
	}

	c.set("usuario", null)

	deleteCookie(c, "refresh_token")

	return c.json({ status: "ok" }, 200)
})
