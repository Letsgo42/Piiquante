const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

router.post('/signup', authCtrl.createUser);
router.post('/login', authCtrl.checkUser); // POST method pour check?

module.exports = router;