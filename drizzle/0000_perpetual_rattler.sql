CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"content" text,
	"tag" integer[],
	CONSTRAINT "articles_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "questionnaires" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"image" text,
	"questions" integer[],
	CONSTRAINT "questionnaires_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"swali" text,
	"choices" text[],
	"answer" text,
	CONSTRAINT "questions_swali_unique" UNIQUE("swali")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	CONSTRAINT "tags_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"username" text,
	"image" text,
	"bookmarks" integer[],
	"read" integer[],
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
