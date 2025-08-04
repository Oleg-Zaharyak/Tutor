import { Router } from "express";
import { getAllProfiles, getProfileById } from "./account.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/profiles", requireAuth, getAllProfiles);
router.get("/profile/:id", requireAuth, getProfileById);
// router.post("/", createAccount);

export default router;
