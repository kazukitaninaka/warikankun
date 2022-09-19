-- DropForeignKey
ALTER TABLE `PaymentsOnParticipants` DROP FOREIGN KEY `PaymentsOnParticipants_paymentId_fkey`;

-- AddForeignKey
ALTER TABLE `PaymentsOnParticipants` ADD CONSTRAINT `PaymentsOnParticipants_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
