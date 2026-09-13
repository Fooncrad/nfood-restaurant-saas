CREATE TABLE `digitalCatalogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`entityId` int NOT NULL,
	`catalogType` enum('menu','showcase','catalog') NOT NULL DEFAULT 'catalog',
	`name` varchar(160) NOT NULL,
	`locale` varchar(10) NOT NULL DEFAULT 'ar',
	`thumbnailUrl` varchar(500),
	`itemsJson` text NOT NULL,
	`captionsJson` text,
	`isPublished` boolean NOT NULL DEFAULT false,
	`publishedAt` timestamp,
	`createdByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `digitalCatalogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `governanceAuditLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`entityId` int,
	`action` enum('sector.activated','sector.deactivated','entity.created','entity.status_changed','entity.plan_changed','catalog.published','catalog.unpublished','license.verified') NOT NULL,
	`actorUserId` int,
	`beforeJson` text,
	`afterJson` text,
	`metadataJson` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `governanceAuditLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `platformEntities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sectorKey` enum('veg','grocery','laundry','auto','barber','public','fashion') NOT NULL,
	`entityRefId` int,
	`name` varchar(160) NOT NULL,
	`slug` varchar(160) NOT NULL,
	`city` varchar(120),
	`status` enum('pending','active','paused','suspended') NOT NULL DEFAULT 'pending',
	`hasBusinessLicense` boolean NOT NULL DEFAULT false,
	`plan` varchar(40) NOT NULL DEFAULT 'Free',
	`taxNumber` varchar(80),
	`currencyCode` varchar(8) NOT NULL DEFAULT 'SAR',
	`email` varchar(320),
	`phone` varchar(40),
	`featureFlagsJson` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `platformEntities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `digitalCatalogs` ADD CONSTRAINT `digitalCatalogs_entityId_platformEntities_id_fk` FOREIGN KEY (`entityId`) REFERENCES `platformEntities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `digitalCatalogs` ADD CONSTRAINT `digitalCatalogs_createdByUserId_users_id_fk` FOREIGN KEY (`createdByUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `governanceAuditLogs` ADD CONSTRAINT `governanceAuditLogs_entityId_platformEntities_id_fk` FOREIGN KEY (`entityId`) REFERENCES `platformEntities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `governanceAuditLogs` ADD CONSTRAINT `governanceAuditLogs_actorUserId_users_id_fk` FOREIGN KEY (`actorUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `platformEntities` ADD CONSTRAINT `platformEntities_entityRefId_restaurants_id_fk` FOREIGN KEY (`entityRefId`) REFERENCES `restaurants`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `digital_catalogs_entity_published_idx` ON `digitalCatalogs` (`entityId`,`isPublished`);--> statement-breakpoint
CREATE INDEX `governance_audit_logs_entity_idx` ON `governanceAuditLogs` (`entityId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `governance_audit_logs_action_idx` ON `governanceAuditLogs` (`action`,`createdAt`);--> statement-breakpoint
CREATE INDEX `governance_audit_logs_actor_idx` ON `governanceAuditLogs` (`actorUserId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `platform_entities_sector_status_idx` ON `platformEntities` (`sectorKey`,`status`);--> statement-breakpoint
CREATE INDEX `platform_entities_slug_idx` ON `platformEntities` (`slug`);