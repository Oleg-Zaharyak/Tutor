import { Router } from "express";
import accountRoutes from "../modules/account/account.routes";
import profileRoutes from "../modules/profile/profile.routes";
import { requireAuth } from "@clerk/express";

const router = Router();

router.use("/accounts", requireAuth(), accountRoutes);
router.use("/profiles", requireAuth(), profileRoutes);

export default router;
