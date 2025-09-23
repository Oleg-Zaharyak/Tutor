import { Router } from "express";
import { connectAccounts, getConnectedAccounts } from "./connection.controller";

const router = Router();

router.get("/getAllConnectedAccounts/:accountId", getConnectedAccounts);

//Створення конекшина
router.post("/create", connectAccounts);

export default router;
