const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.loginUser); // POST method pour check?

module.exports = router;