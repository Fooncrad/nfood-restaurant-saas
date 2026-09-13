CREATE TABLE `digital_catalogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`entity_id` varchar(30) NOT NULL,
	`catalog_url` text NOT NULL,
	`is_public` boolean NOT NULL DEFAULT true,
	`total_items` int NOT NULL DEFAULT 0,
	`last_synced_at` timestamp DEFAULT (now()),
	CONSTRAINT `digital_catalogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `governance_audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`admin_id` varchar(50) NOT NULL,
	`entity_id` varchar(30),
	`action_type` varchar(100) NOT NULL,
	`previous_state` text,
	`next_state` text,
	`performed_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `governance_audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `platform_entities` (
	`id` varchar(30) NOT NULL,
	`customer_name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`sector` enum('restaurant','vegetables','grocery','laundry','automotive','beauty_salon','public_works','fashion') NOT NULL DEFAULT 'restaurant',
	`status` boolean NOT NULL DEFAULT true,
	`plan` enum('Basic','Pro','Enterprise') NOT NULL DEFAULT 'Basic',
	`tax_id` varchar(50) NOT NULL,
	`licensing_fee` decimal(10,2) NOT NULL DEFAULT '0.00',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `platform_entities_id` PRIMARY KEY(`id`),
	CONSTRAINT `platform_entities_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `digital_catalogs` ADD CONSTRAINT `digital_catalogs_entity_id_platform_entities_id_fk` FOREIGN KEY (`entity_id`) REFERENCES `platform_entities`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `governance_audit_logs` ADD CONSTRAINT `governance_audit_logs_entity_id_platform_entities_id_fk` FOREIGN KEY (`entity_id`) REFERENCES `platform_entities`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `digital_catalogs_entity_idx` ON `digital_catalogs` (`entity_id`);--> statement-breakpoint
CREATE INDEX `governance_audit_logs_entity_idx` ON `governance_audit_logs` (`entity_id`,`performed_at`);--> statement-breakpoint
CREATE INDEX `governance_audit_logs_action_idx` ON `governance_audit_logs` (`action_type`,`performed_at`);--> statement-breakpoint
CREATE INDEX `platform_entities_sector_idx` ON `platform_entities` (`sector`,`status`);--> statement-breakpoint
CREATE INDEX `platform_entities_email_idx` ON `platform_entities` (`email`);