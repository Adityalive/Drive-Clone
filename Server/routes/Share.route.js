  
  import express from "express";
  import { createShareLink, accessShareLink } from "../controller/Sharelink.controller.js";
  import { auth } from "../middleware/auth.js";
  const router = express.Router();

  router.post("/:fileId", auth, createShareLink);
  router.get("/:token", accessShareLink);

  export default router;
