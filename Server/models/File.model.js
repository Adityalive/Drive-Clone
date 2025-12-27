// models/File.model.js
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assumes you have a User model
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
      url: String,

  size: {
    type: Number, // in bytes
    required: true
  },
  type: {
    type: String, // e.g., 'image/png', 'application/pdf'
    required: true
  },
  isShared: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }); // adds createdAt and updatedAt automatically

const File = mongoose.model('File', fileSchema);
export default File;