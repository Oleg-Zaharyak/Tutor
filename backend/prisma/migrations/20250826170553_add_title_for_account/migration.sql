/*
  Warnings:

  - Added the required column `title` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."AccountStatus" ADD VALUE 'CLOSED';

-- AlterTable
ALTER TABLE "public"."Account" ADD COLUMN     "title" TEXT NOT NULL;
