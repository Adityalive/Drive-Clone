import File from "../models/File.model.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../services/cloudinary.services.js";
import { AppError } from "./utils/AppError.js";
import { asyncHandler } from "./utils/asyncHandler.js";

/**
 * UPLOAD FILE
 */
export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("No file uploaded", 400);
  }

  const result = await uploadToCloudinary(
    req.file.buffer,
    "drive-files"
  );

  const file = await File.create({
    owner: req.user.id,
    originalName: req.file.originalname,
    publicId: result.public_id,
    url: result.secure_url,
    size: result.bytes,
    fileType: result.resource_type,
  });

  res.status(201).json(file);
});

/**
 * GET MY FILES (PAGINATED)
 */
export const getMyFiles = asyncHandler(async (req, res) => {
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const files = await File.find({ owner: req.user.id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalFiles = await File.countDocuments({
    owner: req.user.id,
  });

  res.json({
    page,
    limit,
    totalFiles,
    totalPages: Math.ceil(totalFiles / limit),
    files,
  });
});

/**
 * DELETE FILE
 */
export const deleteFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    throw new AppError("File not found", 404);
  }

  if (file.owner.toString() !== req.user.id) {
    throw new AppError("Not allowed", 403);
  }

  await cloudinary.uploader.destroy(file.publicId);
  await file.deleteOne();

  res.json({ message: "File deleted successfully" });
});
