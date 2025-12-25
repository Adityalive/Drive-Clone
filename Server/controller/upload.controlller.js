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
