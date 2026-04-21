CREATE TABLE `task_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`tasks` text NOT NULL,
	`focusLevel` enum('hyperfocus','normal','distracted') NOT NULL DEFAULT 'normal',
	`granularity` int NOT NULL DEFAULT 50,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `task_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `task_sessions` ADD CONSTRAINT `task_sessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;