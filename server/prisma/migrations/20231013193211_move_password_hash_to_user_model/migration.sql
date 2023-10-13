/*
  Warnings:

  - You are about to drop the `auth` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `passwordHash` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "auth" DROP CONSTRAINT "auth_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "passwordHash" TEXT NOT NULL;

-- DropTable
DROP TABLE "auth";
