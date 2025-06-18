const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getTodaysQuest, completeQuest } = require('../controllers/questController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/today', getTodaysQuest);
router.post('/complete', upload.fields([{ name: 'image' }, { name: 'audio' }]), completeQuest);

module.exports = router;
