import { Router } from "express";
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "./profile.controller";
import { requireAuth } from "../../middleware/requireAuth";

const router = Router();

router.get("/", requireAuth, getAllProfiles);
router.get("/:id", requireAuth, getProfileById);

//Створення профілю
router.post("/create", requireAuth, createProfile);

//Оновлення профілю
router.patch("/update", requireAuth, updateProfile);

export default router;
