/*
  Warnings:

  - You are about to drop the column `selectedAccount` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[selectedAccountId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "selectedAccount",
ADD COLUMN     "selectedAccountId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_selectedAccountId_key" ON "public"."Profile"("selectedAccountId");
