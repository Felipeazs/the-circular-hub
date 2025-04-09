CREATE TABLE "respuestas" (
	"id" text PRIMARY KEY NOT NULL,
	"usuario_id" text,
	"cl_1" text,
	"cl_2" text,
	"cl_3" text,
	"ds_1" text,
	"ds_2" text,
	"ds_3" text,
	"es_1" text,
	"es_2" text,
	"es_3" text,
	"ee_1" text,
	"ee_2" text,
	"er_1" text,
	"er_2" text,
	"er_3" text,
	"ge_1" text,
	"ge_2" text,
	"ge_3" text,
	"gr_1" text,
	"gr_2" text,
	"gr_3" text,
	"gs_1" text,
	"gs_2" text,
	"gs_3" text,
	"ia_1" text,
	"ia_2" text,
	"ia_3" text,
	"v_1" text,
	"v_2" text,
	"v_3" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" text PRIMARY KEY NOT NULL,
	"nombre" text,
	"apellido" text,
	"email" text NOT NULL,
	"organizacion" text,
	"password" text NOT NULL,
	"roles" text[] DEFAULT '{"user"}',
	"image" text,
	"password_reset_token" text DEFAULT '',
	"password_reset_expires" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "respuestas" ADD CONSTRAINT "respuestas_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx" ON "respuestas" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "usuarios" USING btree ("email");