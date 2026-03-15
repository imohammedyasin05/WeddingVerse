const express = require('express');
const router = express.Router();
const { createInquiry, getMyInquiries } = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createInquiry);
router.get('/my', protect, getMyInquiries);

module.exports = router;
