import { Request, Response } from "express";
import prisma from "../prismaClient";

// Отримати всіх користувачів
export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.json(profiles);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Отримати профіль по id
export const getProfileById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const profile = await prisma.profile.findUnique({
      where: { id },
    });

    if (!profile) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching account by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

