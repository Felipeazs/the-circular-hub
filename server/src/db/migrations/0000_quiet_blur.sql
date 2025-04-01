CREATE TABLE "respuestas" (
	"id" serial PRIMARY KEY NOT NULL,
	"usuario_id" text,
	"go_1" boolean,
	"go_2" boolean,
	"go_3" boolean
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"roles" text[]
);
--> statement-breakpoint
ALTER TABLE "respuestas" ADD CONSTRAINT "respuestas_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "usuario_idx" ON "respuestas" USING btree ("usuario_id");--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "usuarios" USING btree ("email");