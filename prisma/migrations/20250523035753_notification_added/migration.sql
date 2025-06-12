-- CreateEnum
CREATE TYPE "NotificationCategory" AS ENUM ('SYSTEM', 'USER', 'ERROR', 'INVENTORY', 'ORDER', 'PAYMENT', 'PROMOTION', 'ACCOUNT', 'SECURITY', 'PRESCRIPTION', 'REFUND', 'DELIVERY');

-- CreateEnum
CREATE TYPE "NotificationPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "category" "NotificationCategory" NOT NULL,
    "priority" "NotificationPriority" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
