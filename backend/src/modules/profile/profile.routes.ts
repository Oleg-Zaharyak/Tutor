import { Router } from "express";
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "./profile.controller";

const router = Router();

router.get("/", getAllProfiles);
router.get("/current", getProfileById);
// router.get("/profile", getProfileById);

//Створення профілю
router.post("/", createProfile);

//Оновлення профілю
router.patch("/", updateProfile);

export default router;
