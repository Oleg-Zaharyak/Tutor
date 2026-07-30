import { Router } from "express";
import accountRoutes from "../modules/account/account.routes";
import profileRoutes from "../modules/profile/profile.routes";
import connectionRoutes from "../modules/connection/connection.routes";
import uploadsRoutes from "../modules/uploads/uploads.routes";
import { getAuth } from "@clerk/express";

const router = Router();

const clerkAuthMiddleware = (req: any, res: any, next: any) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

// 2. Підключаємо нову мідлвару до ваших маршрутів
router.use("/accounts", clerkAuthMiddleware, accountRoutes);
router.use("/profiles", clerkAuthMiddleware, profileRoutes);
router.use("/connections", clerkAuthMiddleware, connectionRoutes);
router.use("/uploads", clerkAuthMiddleware, uploadsRoutes);

export default router;
