import { Router } from "express";
import {
  connectAccounts,
  deleteConnectionById,
  getConnectedAccounts,
  getConnectionById,
} from "./connection.controller";
import { getAuth } from "@clerk/express";

const router = Router();

router.use((req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
});

router.get("/", getConnectedAccounts);
router.get("/:connectionId", getConnectionById);

//Створення конекшина
router.post("/", connectAccounts);

//Видалення конекшина
router.delete("/:connectionId", deleteConnectionById);

export default router;
