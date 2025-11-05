ALTER TABLE `users` DROP INDEX `usernameIdx`;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_username_unique` UNIQUE(`username`);