DROP INDEX "users_oauth_provider_id_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "two_factor_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "two_factor_secret" varchar(255);--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "oauth_provider";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "oauth_id";