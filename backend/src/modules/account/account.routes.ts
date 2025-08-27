import { Router } from "express";
import {
  createAccount,
  getAccountById,
  getAllUserAccounts,
} from "./account.controller";

const router = Router();

router.get("/allUserAccounts/:profileId", getAllUserAccounts);
router.get("/:id", getAccountById);

//Створення акаунта
router.post("/create", createAccount);

export default router;
