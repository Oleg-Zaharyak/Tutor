import { Router } from "express";
import {
  createAccount,
  getAccountById,
  getAllUserAccounts,
} from "./account.controller";
import { requireAuth } from "../../middleware/requireAuth";

const router = Router();

router.get("/allUserAccounts/:profileId", requireAuth, getAllUserAccounts);
router.get("/:id", requireAuth, getAccountById);

//Створення акаунта
router.post("/create", requireAuth, createAccount);

export default router;
