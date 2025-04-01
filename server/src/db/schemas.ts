import { relations } from "drizzle-orm"
import { boolean, integer, pgTable, serial, text, uniqueIndex } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const usuario = pgTable(
	"usuarios",
	{
		id: serial("id").primaryKey(),
		email: text("email").notNull(),
		password: text("password").notNull(),
		roles: text({ enum: ["super_admin", "admin", "user"] }).array(),
		image: text("image"),
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
	email: z.string().email(),
	roles: z.array(z.enum(["super_admin", "admin", "user"])),
	image: z.string().url(),
})

export const usuarioSchema = createSelectSchema(usuario)
export type Usuario = z.infer<typeof usuarioSchema>
