import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production"]).default("development"),
		DATABASE_URI: z.string(),
		ORIGIN_URL: z.string(),
		SENTRY_DNS: z.string(),
		JWT_ACCESS_SECRET: z.string(),
		JWT_REFRESH_SECRET: z.string(),
		COOKIE_SECRET: z.string(),
		REDIS_URL: z.string(),
		POSTHOG_APIKEY: z.string(),
		POSTHOG_HOST: z.string(),
		CLOUDINARY_API_KEY: z.string(),
		CLOUDINARY_API_SECRET: z.string(),
		CLOUDINARY_NAME: z.string(),
		CLOUDINARY_FOLDER: z.string(),
		RESEND_API_KEY: z.string().optional(),
	},
	runtimeEnv: process.env,
	skipValidation: false,
	emptyStringAsUndefined: true,
})
