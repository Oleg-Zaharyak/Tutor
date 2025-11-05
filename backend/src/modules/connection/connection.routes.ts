import { Router } from "express";
import { connectAccounts, deleteConnectionById, getConnectedAccounts, getConnectionById } from "./connection.controller";

const router = Router();

router.get("/", getConnectedAccounts);
router.get("/:connectionId", getConnectionById);

//Створення конекшина
router.post("/", connectAccounts);

//Видалення конекшина
router.delete("/:connectionId", deleteConnectionById)

export default router;
