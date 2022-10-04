const express = require('express');
const router = express.Router();

//const auth = require('../middleware/auth');
const userCtrl = require('../controllers/userController');


router.post('/signup', userCtrl.registerUser);
router.post('/login', userCtrl.login);

module.exports = router;