import { Hono } from "hono"

import type { AppAPI, AppEnv } from "../lib/types"

import { BASE_PATH } from "../lib/constants"
import rateLimit from "../middlewares/rate-limit"
import authMe from "./auth"
import login from "./login"
import logout from "./logout"
import password_route from "./password"
import refresh from "./refresh"
import respuestas_route from "./respuestas"
import signup from "./signup"
import usuario_route from "./usuario"

export function registerRoutes(app: AppAPI) {
	return app
		.get("/health", rateLimit, (c) => {
			c.status(200)
			return c.text("API live and running...")
		})
		.get("/error", (c) => {
			return c.json({ message: "error route" })
		})
		.route("/login", login)
		.route("/signup", signup)
		.route("/logout", logout)
		.route("/password", password_route)
		.route("/auth", authMe)
		.route("/refresh", refresh)
		.route("/usuario", usuario_route)
		.route("/respuestas", respuestas_route)
}

// to use in client api
export const router = registerRoutes(
	new Hono<AppEnv>({
		strict: false,
	}).basePath(BASE_PATH),
)

export type AppRouter = typeof router
