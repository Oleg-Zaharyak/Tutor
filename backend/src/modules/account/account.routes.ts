import { Router } from "express";
import {
  createAccount,
  getCurrentAccount,
  getAllUserAccounts,
} from "./account.controller";
import { getAuth } from "@clerk/express";

const router = Router();

router.use((req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
});

router.get("/", getAllUserAccounts);
router.get("/current", getCurrentAccount);

//Створення акаунта
router.post("/", createAccount);

export default router;
