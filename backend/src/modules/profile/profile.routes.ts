import { Router } from "express";
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "./profile.controller";

const router = Router();

router.get("/", getAllProfiles);
router.get("/getCurrentUserProfile", getProfileById);
// router.get("/profile", getProfileById);

//Створення профілю
router.post("/createNewProfile", createProfile);

//Оновлення профілю
router.patch("/updateUserProfile", updateProfile);

export default router;
