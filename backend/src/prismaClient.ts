import { PrismaClient } from "@prisma/client";
import "dotenv/config";

export  const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL, // твій ключ Prisma Accelerate
});