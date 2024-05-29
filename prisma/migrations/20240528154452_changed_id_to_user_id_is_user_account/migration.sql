/*
  Warnings:

  - The primary key for the `useraccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `useraccount` table. All the data in the column will be lost.
  - You are about to alter the column `userId` on the `useraccount` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `userprofile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `userprofile` DROP FOREIGN KEY `UserProfile_userId_fkey`;

-- DropIndex
DROP INDEX `UserAccount_userId_key` ON `useraccount`;

-- AlterTable
ALTER TABLE `useraccount` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `userprofile` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserAccount`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
