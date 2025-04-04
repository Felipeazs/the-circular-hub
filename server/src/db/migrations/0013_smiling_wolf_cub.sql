ALTER TABLE "usuarios" ADD COLUMN "password_reset_token" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "usuarios" ADD COLUMN "password_reset_expires" timestamp;