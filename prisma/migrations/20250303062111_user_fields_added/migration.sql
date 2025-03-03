/*
  Warnings:

  - You are about to drop the column `deletedById` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_createdById_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_deletedById_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deletedById",
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedBy" TEXT;
