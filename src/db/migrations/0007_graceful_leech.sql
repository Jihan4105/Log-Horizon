ALTER TABLE "comments" ADD COLUMN "reply_id" integer DEFAULT -1;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "updated_at" timestamp DEFAULT now();