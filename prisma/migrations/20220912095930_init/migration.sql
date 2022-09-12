/*
  Warnings:

  - You are about to alter the column `ratio` on the `PaymentsOnParticipants` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `PaymentsOnParticipants` MODIFY `ratio` DOUBLE NULL;
