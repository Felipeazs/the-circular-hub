import { defineConfig } from "drizzle-kit"

import { env } from "./src/t3-env"

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schemas.ts",
	out: "./src/db/migrations",
	dbCredentials: {
		url: env.DATABASE_URI,
	},
})
