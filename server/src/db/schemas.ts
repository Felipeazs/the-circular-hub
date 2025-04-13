import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import { foreignKey, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const usuario = pgTable(
	"usuarios",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId())
			.notNull(),
		nombre: text("nombre"),
		apellido: text("apellido"),
		email: text("email").notNull(),
		organizacion: text("organizacion"),
		password: text("password").notNull(),
		roles: text({ enum: ["super_admin", "admin", "user"] })
			.array()
			.default(["user"]),
		image: text("image"),
		passwordResetToken: text("password_reset_token").default(""),
		passwordResetExpires: timestamp("password_reset_expires"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdateFn(() => new Date())
			.notNull(),
	},
	(table) => {
		return [uniqueIndex("email_idx").on(table.email)]
	},
)

export const respuesta = pgTable(
	"respuestas",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId())
			.notNull(),
		usuarioId: text("usuario_id"),
		colaboracion_1: text("cl_1", { enum: ["si", "no"] }),
		colaboracion_2: text("cl_2", { enum: ["si", "no"] }),
		colaboracion_3: text("cl_3", { enum: ["si", "no"] }),
		diseno_circular_1: text("ds_1", { enum: ["si", "no"] }),
		diseno_circular_2: text("ds_2", { enum: ["si", "no"] }),
		diseno_circular_3: text("ds_3", { enum: ["si", "no"] }),
		educacion_sensibilizacion_1: text("es_1", { enum: ["si", "no"] }),
		educacion_sensibilizacion_2: text("es_2", { enum: ["si", "no"] }),
		educacion_sensibilizacion_3: text("es_3", { enum: ["si", "no"] }),
		energia_eficiencia_1: text("ee_1", { enum: ["si", "no"] }),
		energia_eficiencia_2: text("ee_2", { enum: ["si", "no"] }),
		extension_reparabilidad_1: text("er_1", { enum: ["si", "no"] }),
		extension_reparabilidad_2: text("er_2", { enum: ["si", "no"] }),
		extension_reparabilidad_3: text("er_3", { enum: ["si", "no"] }),
		gestion_estrategia_1: text("ge_1", { enum: ["si", "no"] }),
		gestion_estrategia_2: text("ge_2", { enum: ["si", "no"] }),
		gestion_estrategia_3: text("ge_3", { enum: ["si", "no"] }),
		gestion_recursos_1: text("gr_1", { enum: ["si", "no"] }),
		gestion_recursos_2: text("gr_2", { enum: ["si", "no"] }),
		gestion_recursos_3: text("gr_3", { enum: ["si", "no"] }),
		gestion_residuos_1: text("gs_1", { enum: ["si", "no"] }),
		gestion_residuos_2: text("gs_2", { enum: ["si", "no"] }),
		gestion_residuos_3: text("gs_3", { enum: ["si", "no"] }),
		impacto_ambiental_1: text("ia_1", { enum: ["si", "no"] }),
		impacto_ambiental_2: text("ia_2", { enum: ["si", "no"] }),
		impacto_ambiental_3: text("ia_3", { enum: ["si", "no"] }),
		vinculacion_1: text("v_1", { enum: ["si", "no"] }),
		vinculacion_2: text("v_2", { enum: ["si", "no"] }),
		vinculacion_3: text("v_3", { enum: ["si", "no"] }),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdateFn(() => new Date())
			.notNull(),
	},
	(table) => {
		return [
			uniqueIndex("idx").on(table.id),
			foreignKey({ columns: [table.usuarioId], foreignColumns: [usuario.id] }).onDelete("cascade"),
		]
	},
)

export const usuarioRelations = relations(usuario, ({ many }) => ({
	respuestas: many(respuesta),
}))

export const respuestaRelations = relations(respuesta, ({ one }) => ({
	autor: one(usuario, {
		fields: [respuesta.usuarioId],
		references: [usuario.id],
	}),
}))

const email_specs = z.string().email({ message: "ingrese un mail válido" })

const password_specs = z
	.string()
	.min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
	.max(100, { message: "La contraseña debe tene como máximo 100 caracteres" })
	.refine((password) => /[A-Z]/.test(password), {
		message: "La contraseña debe tener al menos una letra mayúscula",
	})
	.refine((password) => /[a-z]/.test(password), {
		message: "La contraseña debe tener al menos una letra minúscula",
	})
	.refine((password) => /\d/.test(password), {
		message: "La contraseña debe tener al menos un número",
	})
	.refine((password) => /[^a-z0-9\s]/i.test(password), {
		message: "La contraseña debe tener al menos un símbolo",
	})

export const signupSchema = z.object({
	email: email_specs,
	password: password_specs,
	repeat_password: password_specs,
})

export const loginSchema = signupSchema.omit({
	repeat_password: true,
})

export const forgotPassSchema = signupSchema.omit({
	password: true,
	repeat_password: true,
})

export const resetPassSchema = signupSchema.omit({
	email: true,
})

export const resetPassTokenSchema = z.object({
	token: z.string(),
})

export const changePassSchema = z.object({
	password: password_specs,
	new_password: password_specs,
	repeat_new_password: password_specs,
})

export const editUsuarioSchema = createInsertSchema(usuario, {
	nombre: z.string(),
	apellido: z.string(),
	organizacion: z.string(),
	email: email_specs,
	image: z
		.union([
			z.instanceof(File),
			z.string().transform((value) => (value === "" ? undefined : value)),
		])
		.optional(),
	roles: z.union([
		z
			.array(z.enum(["super_admin", "admin", "user"]))
			.default(["user"])
			.optional(),
		z.string(),
	]),
}).omit({
	id: true,
	password: true,
	passwordResetToken: true,
	passwordResetExpires: true,
	createdAt: true,
	updatedAt: true,
})

export const usuarioSchema = createSelectSchema(usuario).omit({
	password: true,
	passwordResetToken: true,
	passwordResetExpires: true,
})

export const respuestasSchema = createSelectSchema(respuesta).omit({
	usuarioId: true,
})
export const createRespuestasSchema = createInsertSchema(respuesta).omit({
	id: true,
	usuarioId: true,
	createdAt: true,
	updatedAt: true,
})

// usuario
export type Usuario = z.infer<typeof usuarioSchema>
export type LoginUsuario = z.infer<typeof loginSchema>
export type SignupUsuario = z.infer<typeof signupSchema>
export type EditUsuario = z.infer<typeof editUsuarioSchema>

// respuestas
export type Respuestas = z.infer<typeof respuestasSchema>
export type CreateRespuestas = z.infer<typeof createRespuestasSchema>
