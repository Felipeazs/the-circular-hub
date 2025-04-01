import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production"]).default("development"),
		DATABASE_URI: z.string().url(),
		ORIGIN_URL: z.string(),
		SENTRY_DNS: z.string().optional(),
		JWT_ACCESS_SECRET: z.string(),
		JWT_REFRESH_SECRET: z.string(),
		COOKIE_SECRET: z.string(),
		REDIS_URL: z.string().optional(),
		POSTHOG_APIKEY: z.string().optional(),
		POSTHOG_HOST: z.string().optional(),
		CLOUDINARY_API_KEY: z.string().optional(),
		CLOUDINARY_API_SECRET: z.string().optional(),
		CLOUDINARY_NAME: z.string().optional(),
		CLOUDINARY_FOLDER: z.string().optional(),
	},
	runtimeEnv: process.env,
	skipValidation: false,
	emptyStringAsUndefined: true,
})
