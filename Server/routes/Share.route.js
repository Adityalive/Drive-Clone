  
  import express from "express";
  import { createShareLink } from "../controller/Sharelink.controller";
  import auth from "../middleware/auth.js";
  const router = express.Router();
  
  router.post("/:fileId",auth, acreateShareLink);
  
  export default router;
