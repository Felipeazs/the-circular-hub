ALTER TABLE "respuestas" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "respuestas" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "usuarios" ADD COLUMN "nombre" text;--> statement-breakpoint
ALTER TABLE "usuarios" ADD COLUMN "apellido" text;--> statement-breakpoint
ALTER TABLE "usuarios" ADD COLUMN "organizacion" text;--> statement-breakpoint
ALTER TABLE "usuarios" ADD COLUMN "rut" text;--> statement-breakpoint
ALTER TABLE "usuarios" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "usuarios" ADD COLUMN "updatedAt" timestamp;