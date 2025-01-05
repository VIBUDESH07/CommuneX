const express = require('express');
const friendController = require('../controller/FriendController'); // Adjust path as necessary

const router = express.Router();

router.get('/friends', friendController.getFriends);

router.post('/addfriend', friendController.sendFriendRequest);

router.get('/allusers',friendController.getAllUsers)

router.get('/friend/requests',friendController.getPendingRequests)
router.post('/handleRequest',friendController.respondToFriendRequest)
module.exports = router;

