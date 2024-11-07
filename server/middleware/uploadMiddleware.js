// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid name conflicts
  },
});

// File filter (optional, for example to limit file types)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Accept only image files
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }
  cb(null, true);
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // Optional file filter
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size (10 MB)
});

module.exports = upload;
