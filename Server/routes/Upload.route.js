import express from "express";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { uploadFile, getMyFiles } from "../controller/file.controller.js";

const router = express.Router();

router.post("/upload", auth, upload.single("file"), uploadFile);
router.get("/", auth, getMyFiles);

export default router;
