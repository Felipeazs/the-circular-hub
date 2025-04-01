import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
	clientPrefix: "VITE_",
	client: {
		VITE_API_URL: z.string(),
		VITE_PUBLIC_POSTHOG_KEY: z.string(),
		VITE_PUBLIC_POSTHOG_HOST: z.string(),
	},
	runtimeEnv: import.meta.env,

	skipValidation: false,
	emptyStringAsUndefined: true,
})
