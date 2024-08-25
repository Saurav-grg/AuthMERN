const express = require('express');
const router = express.Router();
const {
  signup,
  verifyEmail,
  logout,
  login,
} = require('../controller/authControl');

router.post('/sign-up', signup);
router.post('/verify-email', verifyEmail);
router.post('/logout', logout);
router.post('/login', login);

module.exports = router;
