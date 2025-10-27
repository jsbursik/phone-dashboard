CREATE TABLE "phone_configs" (
	"phone-model" text PRIMARY KEY NOT NULL,
	"phone-cfg-filename" text NOT NULL,
	"phone-cfg" text NOT NULL,
	"additional_files" json DEFAULT '[]'::json NOT NULL,
	"variables" json DEFAULT '[]'::json NOT NULL
);
