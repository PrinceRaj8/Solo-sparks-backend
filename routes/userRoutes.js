const express = require('express');
const router = express.Router();
const { updateMood, updateProfile } = require('../controllers/userController');

router.put('/mood', updateMood);
router.put('/profile', updateProfile);

module.exports = router;
