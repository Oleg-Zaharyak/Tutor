import { Router } from "express";
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "./profile.controller";

const router = Router();

router.get("/", getAllProfiles);
router.get("/:id", getProfileById);

//Створення профілю
router.post("/create", createProfile);

//Оновлення профілю
router.patch("/update", updateProfile);

export default router;
