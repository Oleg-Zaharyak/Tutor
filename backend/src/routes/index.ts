import { Router } from "express";
import accountRoutes from "../modules/account/account.routes";
import profileRoutes from "../modules/profile/profile.routes";

const router = Router();

router.use("/accounts", accountRoutes);
router.use("/profiles", profileRoutes);

export default router;
