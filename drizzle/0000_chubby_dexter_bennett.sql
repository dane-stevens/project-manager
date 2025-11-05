CREATE TABLE `messageBoards` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`hId` varchar(35) NOT NULL,
	`title` text NOT NULL,
	`categories` text,
	`projectId` bigint unsigned NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `messageBoards_id` PRIMARY KEY(`id`),
	CONSTRAINT `messageBoards_hId_unique` UNIQUE(`hId`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`hId` varchar(35) NOT NULL,
	`title` text NOT NULL,
	`html` text NOT NULL,
	`markdown` text NOT NULL,
	`raw` text NOT NULL,
	`category` text,
	`isPublished` boolean DEFAULT false,
	`isPinned` boolean DEFAULT false,
	`messageBoardId` bigint unsigned NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`),
	CONSTRAINT `messages_hId_unique` UNIQUE(`hId`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`hId` varchar(35) NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_hId_unique` UNIQUE(`hId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`hId` varchar(35) NOT NULL,
	`username` text NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_hId_unique` UNIQUE(`hId`)
);
