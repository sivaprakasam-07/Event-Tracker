// routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");

const upload = multer({ storage });

router.post("/poster", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // File is already uploaded by multer-storage-cloudinary
    return res.status(200).json({
      secure_url: req.file.path, // This is the Cloudinary image URL
      public_id: req.file.filename, // Optional: to delete image later
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
