import { Request, Response } from "express";
import prisma from "../../prismaClient";
import { Account, Profile, StudentTeacher } from "@prisma/client";

interface ConnectedAccount {
  connection: StudentTeacher;
}

//Витягнути список профілів користувачів які приконекчені

export const getConnectedAccounts = async (req: Request, res: Response) => {
  const { accountId } = req.params;

  try {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
      include: {
        students: { include: { student: { include: { profile: true } } } },
        teachers: { include: { teacher: { include: { profile: true } } } },
      },
    });

    if (!account) return res.status(404).json({ message: "Account not found" });

    let connectedAccounts: ConnectedAccount[] = [];

    if (account.type === "TEACHER") {
      connectedAccounts = account.students.map((relation) => ({
        connection: relation, // сам конекшин
      }));
    } else if (account.type === "STUDENT") {
      connectedAccounts = account.teachers.map((relation) => ({
        connection: relation, // сам конекшин
      }));
    }

    return res.json(connectedAccounts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Створення конекшина

export const connectAccounts = async (req: Request, res: Response) => {
  const { currentAccountId, targetEmail } = req.body;

  // Перевірка акаунта
  const currentAccount = await prisma.account.findUnique({
    where: { id: currentAccountId },
  });

  if (!currentAccount)
    return res.status(404).json({
      error_message: "Current account not found",
      error_code: "account-not-exist",
    });

  // Перевірка чи існує профіль з таким емейлом
  const targetProfile = await prisma.profile.findUnique({
    where: { email: targetEmail },
  });

  if (!targetProfile) {
    return res.status(404).json({
      error_message: `Профіль з email ${targetEmail} не знайдено`,
      error_code: "connect-profile-not-exist",
    });
  }

  // Перевірка чи існує потрібний акаунт
  const targetAccount = await prisma.account.findFirst({
    where: {
      profileId: targetProfile.id,
      type: currentAccount.type === "TEACHER" ? "STUDENT" : "TEACHER",
    },
  });

  if (!targetAccount) {
    return res.status(404).json({
      error_message: `У профілю ${targetEmail} немає акаунта потрібного типу`,
      error_code: "connect-account-not-exist",
    });
  }

  // Перевірка чи не конектиться акаунти одного профілю
  if (currentAccount.profileId === targetAccount.profileId) {
    return res.status(400).json({
      error_message: "Cannot connect accounts from the same profile",
      error_code: "same-profile",
    });
  }

  // Перевірка, чи вже існує конекшин
  const studentId =
    currentAccount.type === "TEACHER" ? targetAccount.id : currentAccount.id;
  const teacherId =
    currentAccount.type === "TEACHER" ? currentAccount.id : targetAccount.id;

  const existingConnection = await prisma.studentTeacher.findUnique({
    where: { studentId_teacherId: { studentId, teacherId } },
  });

  if (existingConnection) {
    return res.status(400).json({
      error_message: "Connection already exists",
      error_code: "connection-exist",
    });
  }

  // Створення конекшина
  const connection = await prisma.studentTeacher.create({
    data: { studentId, teacherId },
  });

  return res.status(201).json(connection);
};

// Видалення конекшина
