import { Router } from "express";
import {
  createAccount,
  getCurrentAccount,
  getAllUserAccounts,
} from "./account.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

router.use(requireAuth());

router.get("/", getAllUserAccounts);
router.get("/current", getCurrentAccount);

//Створення акаунта
router.post("/", createAccount);

export default router;
