-- AlterTable
ALTER TABLE "event" ADD COLUMN     "description" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "ownerId" TEXT;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
