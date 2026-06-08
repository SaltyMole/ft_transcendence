ALTER TYPE "public"."game_status" ADD VALUE 'drawing' BEFORE 'in_progress';--> statement-breakpoint
CREATE TABLE "game_stories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"game_id" uuid NOT NULL,
	"story" text NOT NULL,
	"winner_id" uuid,
	"generated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "game_stories_game_id_unique" UNIQUE("game_id")
);
--> statement-breakpoint
CREATE TABLE "weapon_drawings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"game_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"drawing_data" text NOT NULL,
	"ai_guessed_weapon" varchar(100),
	"submitted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "game_players" ADD COLUMN "is_winner" boolean;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "oauth_provider" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "oauth_id" varchar(255);--> statement-breakpoint
ALTER TABLE "game_stories" ADD CONSTRAINT "game_stories_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_stories" ADD CONSTRAINT "game_stories_winner_id_users_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weapon_drawings" ADD CONSTRAINT "weapon_drawings_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weapon_drawings" ADD CONSTRAINT "weapon_drawings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "users_oauth_provider_id_unique" ON "users" USING btree ("oauth_provider","oauth_id");