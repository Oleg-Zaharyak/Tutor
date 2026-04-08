import { Request, Response } from "express";
import { prisma } from "../../prismaClient";

// Отримати всіх користувачів
export const getAllUserAccounts = async (req: Request, res: Response) => {
  const profileId = (req as any).auth?.userId;

  if (!profileId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const accounts = await prisma.account.findMany({
      where: {
        profileId: profileId, // id профілю користувача
      },
      select: {
        id: true,
        type: true,
        status: true,
        createdAt: true,
      },
    });
    res.json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Отримати профіль по id
export const getCurrentAccount = async (req: Request, res: Response) => {
  try {
    const profileId = (req as any).auth?.userId;

    if (!profileId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Знаходимо профіль з вибраним акаунтом
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      include: {
        accounts: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (!profile.selectedAccountId) {
      return res.status(400).json({ message: "No selected account" });
    }

    // Дістаємо акаунт за selectedAccountId
    const account = await prisma.account.findUnique({
      where: { id: profile.selectedAccountId },
      include: {
        profile: true,
      },
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json(account);
  } catch (error) {
    console.error("Error fetching selected account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Створити Акаунт

export const createAccount = async (req: Request, res: Response) => {
  try {
    const profileId = (req as any).auth?.userId;
    const { type } = req.body;

    if (!profileId || !type)
      return res.status(400).json({ message: "Missing id or account type" });

    const account = await prisma.account.create({
      data: { profileId, type },
    });
    res.status(201).json(account);
  } catch (error: any) {
    if (error.code === "P2002")
      return res.status(409).json({ message: "Account already exists" });
    res.status(500).json({ message: "Internal server error" });
  }
};

// Обновити Акаунт
