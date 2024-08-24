const express = require('express');
const router = express.Router();
const { signup, verifyEmail } = require('../controller/authControl');

router.post('/sign-up', signup);
router.post('/verify-email', verifyEmail);

module.exports = router;
