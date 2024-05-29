/*
  Warnings:

  - The primary key for the `useraccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `userprofile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `userprofile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `userprofile` DROP FOREIGN KEY `UserProfile_userId_fkey`;

-- AlterTable
ALTER TABLE `useraccount` DROP PRIMARY KEY,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `userprofile` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserAccount`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
