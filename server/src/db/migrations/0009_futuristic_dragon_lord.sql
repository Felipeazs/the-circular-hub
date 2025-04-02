DROP INDEX "usuario_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "idx" ON "respuestas" USING btree ("id");