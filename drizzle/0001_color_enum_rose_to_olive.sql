ALTER TABLE "members" ALTER COLUMN "color_choice" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."color_choice";--> statement-breakpoint
CREATE TYPE "public"."color_choice" AS ENUM('slate', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'olive');--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "color_choice" SET DATA TYPE "public"."color_choice" USING "color_choice"::"public"."color_choice";