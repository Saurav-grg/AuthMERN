const express = require('express');
const router = express.Router();
const { signup } = require('../controller/authControl');

router.post('/sign-up', signup);

module.exports = router;
