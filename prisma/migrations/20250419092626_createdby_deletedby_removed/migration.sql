/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `deletedById` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `VerificationCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_deletedById_fkey";

-- DropForeignKey
ALTER TABLE "VerificationCode" DROP CONSTRAINT "VerificationCode_deletedById_fkey";

-- DropForeignKey
ALTER TABLE "VerificationCode" DROP CONSTRAINT "VerificationCode_userId_fkey";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "createdBy",
DROP COLUMN "deletedBy";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "createdBy",
DROP COLUMN "deletedBy";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createdBy",
DROP COLUMN "deletedAt",
DROP COLUMN "deletedBy";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "deletedById";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdBy",
DROP COLUMN "createdById",
DROP COLUMN "deletedBy";

-- DropTable
DROP TABLE "VerificationCode";

-- CreateTable
CREATE TABLE "verification_codes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "VerificationCodeStatus" NOT NULL DEFAULT 'PENDING',
    "type" "VerificationCodeType" NOT NULL DEFAULT 'ACCOUNT_ACTIVATION',
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "verification_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActiveCodes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActiveCodes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ActiveCodes_B_index" ON "_ActiveCodes"("B");

-- AddForeignKey
ALTER TABLE "verification_codes" ADD CONSTRAINT "verification_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActiveCodes" ADD CONSTRAINT "_ActiveCodes_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActiveCodes" ADD CONSTRAINT "_ActiveCodes_B_fkey" FOREIGN KEY ("B") REFERENCES "verification_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
