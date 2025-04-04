import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const usuario = pgTable(
	"usuarios",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId()),
		nombre: text("nombre"),
		apellido: text("apellido"),
		email: text("email").notNull(),
		organizacion: text("organizacion"),
		rut: text("rut"),
		password: text("password").notNull(),
		roles: text({ enum: ["super_admin", "admin", "user"] })
			.array()
			.default(["user"]),
		image: text("image"),
		passwordResetToken: text("password_reset_token").default(""),
		passwordResetExpires: timestamp("password_reset_expires"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
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
			.$defaultFn(() => createId()),
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
		updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
	},
	(table) => {
		return [uniqueIndex("idx").on(table.id)]
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

export const signupSchema = createInsertSchema(usuario, {
	email: z.string().email(),
	password: z.string(),
}).merge(
	z.object({
		repeat_password: z.string(),
	}),
)

export const loginSchema = createInsertSchema(usuario, {
	email: z.string().email(),
	password: z.string(),
})

export const resentSchema = createInsertSchema(usuario).pick({
	email: true,
})

export const editUsuarioSchema = createInsertSchema(usuario, {
	nombre: z.string(),
	apellido: z.string(),
	organizacion: z.string(),
	rut: z.string(),
	email: z.string().email(),
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

export type Usuario = z.infer<typeof usuarioSchema>
export type LoginUsuario = z.infer<typeof loginSchema>
export type SignupUsuario = z.infer<typeof signupSchema>
export type EditUsuario = z.infer<typeof editUsuarioSchema>

export type Respuestas = z.infer<typeof respuestasSchema>
export type CreateRespuestas = z.infer<typeof createRespuestasSchema>
