/*
  Warnings:

  - Made the column `ownerId` on table `event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_ownerId_fkey";

-- AlterTable
ALTER TABLE "event" ALTER COLUMN "ownerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
