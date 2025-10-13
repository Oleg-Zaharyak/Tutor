import { Router } from "express";
import {
  createAccount,
  getCurrentAccount,
  getAllUserAccounts,
} from "./account.controller";

const router = Router();

router.get("/getAllUserAccounts", getAllUserAccounts);
router.get("/getCurrentUserAccount", getCurrentAccount);

//Створення акаунта
router.post("/createNewAccount", createAccount);

export default router;
