import { Router } from "express";
import { connectAccounts, getConnectedAccounts, getConnectionById } from "./connection.controller";

const router = Router();

router.get("/getAllConnections", getConnectedAccounts);
router.get("/getConnections/:connectionId", getConnectionById);

//Створення конекшина
router.post("/createNewConnection", connectAccounts);

export default router;
