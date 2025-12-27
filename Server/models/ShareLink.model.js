 import mongoose from "mongoose";

 const sharelinkSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File', // assumes you have a User model
    required: true
  },
  tokenink: {
    type: String,
    required: true,
    unique: true
  }
 }, { timestamps: true }); // adds createdAt and updatedAt automatically

 const ShareLink = mongoose.model('ShareLink', sharelinkSchema);
 export default ShareLink;