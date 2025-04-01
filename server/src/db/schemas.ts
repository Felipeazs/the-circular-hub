import { relations } from "drizzle-orm"
import {
	boolean,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const usuario = pgTable(
	"usuarios",
	{
		id: serial("id").primaryKey(),
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
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at"),
	},
	(table) => {
		return [uniqueIndex("email_idx").on(table.email)]
	},
)

export const respuesta = pgTable(
	"respuestas",
	{
		id: serial("id").primaryKey(),
		usuarioId: integer("usuario_id").references(() => usuario.id),
		gestion_organizacional_1: boolean("go_1"),
		gestion_organizacional_2: boolean("go_2"),
		gestion_organizacional_3: boolean("go_3"),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp(),
	},
	(table) => {
		return [uniqueIndex("usuario_idx").on(table.usuarioId)]
	},
)

export const usuarioRelations = relations(usuario, ({ many }) => ({
	respuestas: many(respuesta),
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
	roles: z
		.array(z.enum(["super_admin", "admin", "user"]))
		.default(["user"])
		.optional(),
}).omit({
	id: true,
	password: true,
	createdAt: true,
	updatedAt: true,
})

export const usuarioSchema = createSelectSchema(usuario).omit({
	password: true,
})
export type Usuario = z.infer<typeof usuarioSchema>
export type LoginUsuario = z.infer<typeof loginSchema>
export type SignupUsuario = z.infer<typeof signupSchema>
export type EditUsuario = z.infer<typeof editUsuarioSchema>
