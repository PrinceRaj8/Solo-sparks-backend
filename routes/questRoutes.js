const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getTodaysQuest, completeQuest } = require('../controllers/questController');
const { protect } = require('../middleware/authMiddleware'); // Your JWT auth middleware

// Multer memory storage for buffering files before uploading to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Public route to get today's quest
router.get('/today', protect, getTodaysQuest);

// Protected route to complete a quest with optional image/audio upload
router.post(
  '/complete',
  protect,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  completeQuest
);

module.exports = router;
