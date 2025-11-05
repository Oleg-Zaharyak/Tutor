import { Router } from "express";
import {
  createAccount,
  getCurrentAccount,
  getAllUserAccounts,
} from "./account.controller";

const router = Router();

router.get("/", getAllUserAccounts);
router.get("/current", getCurrentAccount);

//Створення акаунта
router.post("/", createAccount);

export default router;
