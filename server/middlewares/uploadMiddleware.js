const multer = require("multer");

// Multer middleware
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Max 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed!"));
    } else {
      cb(null, true);
    }
  },
});
module.exports = upload;
