import { Router } from "express";
import { connectAccounts, deleteConnectionById, getConnectedAccounts, getConnectionById } from "./connection.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

router.use(requireAuth());

router.get("/", getConnectedAccounts);
router.get("/:connectionId", getConnectionById);

//Створення конекшина
router.post("/", connectAccounts);

//Видалення конекшина
router.delete("/:connectionId", deleteConnectionById)

export default router;
