import File from "../models/File.model";
import ShareLink from "../models/ShareLink.model";
import crypto from "crypto";
export const createShareLink = async (req, res) => {
    const { fileId } = req.params;
    try {
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        const shareLink = await ShareLink.create({ fileId });
        res.status(201).json(shareLink);
    } catch (err) {
        console.error("Error creating share link:", err);
        res.status(500).json({ message: "Server error" });
    }
};
