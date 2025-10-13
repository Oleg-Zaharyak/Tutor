import { Request, Response } from "express";
import multer from "multer";
import prisma from "../../prismaClient";
import path from "path";
import fs from "fs";

// ⚙️ Налаштування збереження файлу
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ⚡ Контролер (інтегрований з multer)
export const uploadProfileImg = async (req: Request, res: Response) => {
  // Використовуємо multer як функцію всередині контролера
  upload.single("avatar")(req, res, async (err: any) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ message: "Error uploading file" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Збережений файл
    const filePath = `/uploads/${req.file.filename}`;

    // Тут можна зберегти шлях до БД (наприклад, через Prisma)
    await prisma.profile.update({
      where: { id: (req as any).auth?.userId },
      data: { avatarUrl: filePath },
    });

    res.json({
      message: "File uploaded successfully!",
      path: filePath,
    });
  });
};
