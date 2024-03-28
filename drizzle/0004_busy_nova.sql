CREATE TABLE IF NOT EXISTS "auth-links" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"user-id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "auth-links_code_unique" UNIQUE("code")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth-links" ADD CONSTRAINT "auth-links_user-id_users_id_fk" FOREIGN KEY ("user-id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
