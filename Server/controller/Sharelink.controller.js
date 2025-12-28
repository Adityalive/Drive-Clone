import File from "../models/File.model.js";
import ShareLink from "../models/ShareLink.model.js";
import crypto from "crypto";
import { asyncHandler } from "../utils/asynchandler.js";
import { AppError } from "../utils/Apperror.js";

/**
 * CREATE SHARE LINK (AUTH REQUIRED)
 */
export const createShareLink = asyncHandler(async (req, res) => {
  const { fileId } = req.params;

  const file = await File.findById(fileId);
  if (!file) {
    throw new AppError("File not found", 404);
  }

  // 🔐 owner check
  if (file.owner.toString() !== req.user.id) {
    throw new AppError("Not allowed", 403);
  }

  const token = crypto.randomBytes(16).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const shareLink = await ShareLink.create({
    file: file._id,   // ✅ correct reference
    token,
    expiresAt,
  });

  res.json({
    shareUrl: `${process.env.BASE_URL}/share/${shareLink.token}`,
    expiresAt,
  });
});

/**
 * ACCESS SHARE LINK (PUBLIC)
 */
export const accessShareLink = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const shareLink = await ShareLink.findOne({ token }).populate("file");

  if (!shareLink) {
    throw new AppError("Share link not found", 404);
  }

  if (shareLink.expiresAt < new Date()) {
    throw new AppError("Share link has expired", 410);
  }

  res.json({
    fileName: shareLink.file.originalName,
    url: shareLink.file.url,
  });
});
