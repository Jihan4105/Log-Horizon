CREATE TABLE "save_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) DEFAULT 'UnTitled' NOT NULL,
	"content" text DEFAULT 'No Content' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
