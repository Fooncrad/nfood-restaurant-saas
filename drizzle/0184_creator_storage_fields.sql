ALTER TABLE `digital_catalogs` ADD `catalog_enabled` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `digital_catalogs` ADD `is_freelancer` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `digital_catalogs` ADD `is_photographer` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `digital_catalogs` ADD `storage_used` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `digital_catalogs` ADD `storage_limit` int DEFAULT 1024 NOT NULL;--> statement-breakpoint
CREATE INDEX `digital_catalogs_storage_idx` ON `digital_catalogs` (`is_freelancer`,`is_photographer`);