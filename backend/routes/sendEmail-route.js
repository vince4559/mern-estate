const express = require('express');
const { sendMail } = require('../controllers/send-email-controller');
const router = express.Router();

router.post('/api/sendemail', sendMail);

module.exports = router;