-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "addressLine1" TEXT,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "salary" DOUBLE PRECISION,
ADD COLUMN     "salaryCurrency" TEXT,
ADD COLUMN     "salaryType" "SalaryType",
ADD COLUMN     "zipCode" TEXT;
