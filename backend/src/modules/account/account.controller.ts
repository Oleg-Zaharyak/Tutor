import { Request, Response } from "express";
import prisma from "../../prismaClient";

// Отримати всіх користувачів
export const getAllUserAccounts = async (req: Request, res: Response) => {
  const { profileId } = req.params;

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
export const getAccountById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const account = await prisma.account.findUnique({
      where: { id },
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json(account);
  } catch (error) {
    console.error("Error fetching account by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Створити Акаунт

export const createAccount = async (req: Request, res: Response) => {
  const { profileId, type, title } = req.body;

  if (!profileId || !type)
    return res.status(400).json({ message: "Missing id or account type" });

  try {
    const account = await prisma.account.create({
      data: { profileId, type, title },
    });
    res.status(201).json(account);
  } catch (error: any) {
    if (error.code === "P2002")
      return res.status(409).json({ message: "Account already exists" });
    res.status(500).json({ message: "Internal server error" });
  }
};

// Обновити Акаунт
