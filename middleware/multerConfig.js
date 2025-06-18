const multer = require("multer");
const path = require("path");

// File type filter (accept images and audio)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "audio/mpeg", "audio/wav"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, MP3, WAV allowed."), false);
  }
};

// Multer memory storage (buffer - because we're uploading to Cloudinary)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10 MB
});

module.exports = upload;
    
