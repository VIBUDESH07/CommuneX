const express = require('express');
const { fetchMessages, sendMessage } = require('../controller/MessageController');

const router = express.Router();

// Define routes
router.get('/getmessage', fetchMessages); // Route for fetching messages
router.post('/send', sendMessage); // Route for sending a new message

module.exports = router;
