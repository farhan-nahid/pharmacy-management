/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "logo" TEXT;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_code_key" ON "Brand"("code");
