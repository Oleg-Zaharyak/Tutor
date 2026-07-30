import { Router } from "express";
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "./profile.controller";
import { getAuth } from "@clerk/express";

const router = Router();

router.use((req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
});

router.get("/", getAllProfiles);
router.get("/current", getProfileById);
// router.get("/profile", getProfileById);

//Створення профілю
router.post("/", createProfile);

//Оновлення профілю
router.patch("/", updateProfile);

export default router;
