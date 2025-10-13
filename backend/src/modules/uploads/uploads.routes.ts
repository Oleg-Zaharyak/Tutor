import { Router } from "express";
import { uploadProfileImg } from "./uploads.controller";

const router = Router();

//Додавання фото профілю
router.post("/uploadAvatar", uploadProfileImg);

export default router;
