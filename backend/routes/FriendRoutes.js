const express = require('express');
const friendController = require('../controller/FriendController'); // Adjust path as necessary

const router = express.Router();

router.get('/friends', friendController.getFriends);

router.post('/addfriend', friendController.addFriend);

router.get('/allusers',friendController.getAllUsers)
module.exports = router;
