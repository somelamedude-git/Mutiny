const express = require('express');
const { verifyEmail } = require('../utils/mail.util.js');
const { handleEarlySignUp } = require('../APIs/email.api.js');

const router = express.Router();

router.get('/auth/verifyEmail/:token', verifyEmail);
router.post('/sendMail', handleEarlySignUp);

module.exports = router;

