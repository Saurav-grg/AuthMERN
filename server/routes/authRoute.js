const express = require('express');
const router = express.Router();
const {
  signup,
  verifyEmail,
  logout,
  login,
  forgotPassword,
  resetPassword,
  checkAuth,
} = require('../controller/authControl');

const verifyToken = require('../middleware/verifyToken');

router.get('/check-auth', verifyToken, checkAuth);

router.post('/sign-up', signup);
router.post('/verify-email', verifyEmail);
router.post('/logout', logout);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
