// routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinaryConfig");
const upload = require("../config/multerConfig");

// POST: Upload poster to Cloudinary
router.post("/poster", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "event-posters" }, // Optional folder in Cloudinary
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return res.status(500).json({ error: "Failed to upload poster" });
        }
        res.status(200).json({ url: result.secure_url });
      }
    ).end(req.file.buffer);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
