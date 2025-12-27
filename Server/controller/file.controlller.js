import File from "../models/File.model.js";
import { uploadToCloudinary } from "../services/cloudinary.services.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File required" });
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
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
};
export const getMyFiles = async (req, res) => {
  const files = await File.find({ owner: req.user.id })
    .sort({ createdAt: -1 });

  res.json(files);
};

export const deleteFile = async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  if (file.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await cloudinary.uploader.destroy(file.publicId);
  await file.deleteOne();

  res.json({ message: "File deleted" });
};
