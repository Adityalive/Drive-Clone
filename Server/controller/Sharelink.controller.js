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
        const token = crypto.randomBytes(16).toString("hex");
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const shareLink = await ShareLink.create({ fileId ,
            token,
            expiresAt,
        });
   res.json({
    shareUrl: `${process.env.BASE_URL}/share/${shareLink.token}`,
    expiresAt,
  });    } catch (err) {
        console.error("Error creating share link:", err);
        res.status(500).json({ message: "Server error" });
    }
};
 export const accesSharelink =async(req,res)=>{
    const {token}=req.params;
    try {
        const shareLink = await ShareLink.findOne({ token }.populate("file"));
        if (!shareLink) {
            return res.status(404).json({ message: "Share link not found" });
        }
        if (shareLink.expiresAt < new Date()) {
            return res.status(400).json({ message: "Share link has expired" });
        }
        res.json({
            fileName: share.file.originalName,
    url: share.file.url,
        })
    } catch (error) {
        
    }
 }