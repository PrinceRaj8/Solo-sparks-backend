const express = require('express');
const router = express.Router();
const { getRewards, redeemReward } = require('../controllers/rewardController');
const { protect } = require('../middleware/authMiddleware'); // Optional auth middleware

// Public route to get all rewards (or add `protect` if needed)
router.get('/', protect, getRewards);

// Redeem reward - requires user authentication
router.post('/redeem', protect, redeemReward);

module.exports = router;
