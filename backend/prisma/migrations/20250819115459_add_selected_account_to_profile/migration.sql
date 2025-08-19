/*
  Warnings:

  - Changed the type of `type` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."AccountType" AS ENUM ('STUDENT', 'TEACHER');

-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "type",
ADD COLUMN     "type" "public"."AccountType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Profile" ADD COLUMN     "selectedAccount" "public"."AccountType";

-- DropEnum
DROP TYPE "public"."RoleType";

-- CreateIndex
CREATE UNIQUE INDEX "Account_profileId_type_key" ON "public"."Account"("profileId", "type");
