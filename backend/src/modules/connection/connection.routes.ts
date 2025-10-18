import { Router } from "express";
import { connectAccounts, deleteConnectionById, getConnectedAccounts, getConnectionById } from "./connection.controller";

const router = Router();

router.get("/getAllConnections", getConnectedAccounts);
router.get("/getConnections/:connectionId", getConnectionById);

//Створення конекшина
router.post("/createNewConnection", connectAccounts);

//Видалення конекшина
router.delete("/deleteConnection/:connectionId", deleteConnectionById)

export default router;
