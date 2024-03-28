ALTER TABLE "order-items" DROP CONSTRAINT "order-items_product_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order-items" ADD CONSTRAINT "order-items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
