-- DropForeignKey
ALTER TABLE "eventAttendce" DROP CONSTRAINT "eventAttendce_carId_fkey";

-- DropForeignKey
ALTER TABLE "eventAttendce" DROP CONSTRAINT "eventAttendce_eventId_fkey";

-- DropForeignKey
ALTER TABLE "eventAttendce" DROP CONSTRAINT "eventAttendce_userId_fkey";

-- AddForeignKey
ALTER TABLE "eventAttendce" ADD CONSTRAINT "eventAttendce_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventAttendce" ADD CONSTRAINT "eventAttendce_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventAttendce" ADD CONSTRAINT "eventAttendce_carId_fkey" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
