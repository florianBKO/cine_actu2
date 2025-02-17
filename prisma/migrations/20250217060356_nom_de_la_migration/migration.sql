-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pseudo` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_movie` INTEGER NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Favorie_userId_idx`(`userId`),
    UNIQUE INDEX `Favorie_userId_id_movie_key`(`userId`, `id_movie`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favorie` ADD CONSTRAINT `Favorie_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
