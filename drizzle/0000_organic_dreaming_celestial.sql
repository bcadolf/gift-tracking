CREATE TYPE "public"."color_choice" AS ENUM('slate', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose');--> statement-breakpoint
CREATE TYPE "public"."icon" AS ENUM('alpaca', 'bear', 'boar', 'cat', 'cow', 'crab', 'fox', 'shrimp', 'bird', 'octopus', 'rose', 'shark', 'sprout', 'wolf');--> statement-breakpoint
CREATE TABLE "gifts" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gifts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"link" text,
	"price" numeric(10, 2),
	"reserved" boolean DEFAULT false NOT NULL,
	"added_by" varchar(8),
	"gift_for" varchar(8) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"event" varchar(25) NOT NULL,
	"date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" "icon" NOT NULL,
	"color_choice" "color_choice" NOT NULL,
	"group_id" varchar(8) NOT NULL,
	CONSTRAINT "members_group_icon_color_unq" UNIQUE("group_id","icon","color_choice")
);
--> statement-breakpoint
ALTER TABLE "gifts" ADD CONSTRAINT "gifts_added_by_members_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gifts" ADD CONSTRAINT "gifts_gift_for_members_id_fk" FOREIGN KEY ("gift_for") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "gifts_gift_for_idx" ON "gifts" USING btree ("gift_for");--> statement-breakpoint
CREATE INDEX "gifts_added_by_idx" ON "gifts" USING btree ("added_by");--> statement-breakpoint
CREATE INDEX "members_group_id_idx" ON "members" USING btree ("group_id");