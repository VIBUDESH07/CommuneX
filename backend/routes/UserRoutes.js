const express = require('express');
const userController = require('../controller/UserController'); // Adjust path as necessary

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);
module.exports = router;
