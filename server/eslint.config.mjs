import createConfig from "@monorepo/eslint-config/create-config"
// import drizzle from "eslint-plugin-drizzle"

export default createConfig({
	ignores: ["src/db/migrations/*", "public/*"],
	// plugins: { drizzle },
	// rules: {
	//     ...drizzle.configs.recommended.rules,
	// },
})
