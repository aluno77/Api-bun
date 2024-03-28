ALTER TABLE "auth-links" DROP CONSTRAINT "auth-links_user-id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth-links" ADD CONSTRAINT "auth-links_user-id_users_id_fk" FOREIGN KEY ("user-id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
