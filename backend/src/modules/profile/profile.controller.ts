import { Request, Response } from "express";
import prisma from "../../prismaClient";
import { clerkClient } from "@clerk/express";

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
      include: {
        accounts: {
          select: {
            id: true,
            type: true,
          },
        },
      },
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

//  Створити профіль
export const createProfile = async (req: Request, res: Response) => {
  const { id, email } = req.body;

  if (!id || !email)
    return res.status(400).json({ message: "Missing id or email" });

  try {
    const profile = await prisma.profile.create({
      data: { id, email },
    });
    res.status(201).json(profile);
  } catch (error: any) {
    if (error.code === "P2002")
      return res.status(409).json({ message: "Profile already exists" });
    res.status(500).json({ message: "Internal server error" });
  }
};
// Обновити профіль
export const updateProfile = async (req: Request, res: Response) => {
  const { profileId, data } = req.body;

  if (!profileId) {
    return res.status(400).json({ message: "Missing profileId" });
  }

  try {
    // Якщо є firstName або lastName — генеруємо fullName
    if (data.firstName || data.lastName) {
      // Витягуємо поточні значення
      const oldProfile = await prisma.profile.findUnique({
        where: { id: profileId },
        select: { firstName: true, lastName: true },
      });

      data.fullName = `${data.firstName ?? oldProfile?.firstName ?? ""} ${
        data.lastName ?? oldProfile?.lastName ?? ""
      }`.trim();
    }

    const payload = {
      ...(data.firstName ? { firstName: data.firstName.trim() } : {}),
      ...(data.lastName ? { lastName: data.lastName.trim() } : {}),
    };

    if (Object.keys(payload).length) {
      await clerkClient.users.updateUser(profileId, payload);
    }

    const updatedProfile = await prisma.profile.update({
      where: { id: profileId },
      data,
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
