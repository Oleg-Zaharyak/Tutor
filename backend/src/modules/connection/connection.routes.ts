import { Router } from "express";
import { connectAccounts, getConnectedAccounts } from "./connection.controller";

const router = Router();

router.get("/getAllConnectedAccounts", getConnectedAccounts);

//Створення конекшина
router.post("/createNewConnection", connectAccounts);

export default router;
