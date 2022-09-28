const User = require('../models/userModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const salt = bcrypt.genSalt(10);

exports.createUser = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send(new Error('Bad request !'));
  }

  const userExist = User.findOne(req.body.email)
  if (userExist) {
    return res.send(new Error('E-mail address already registered !'));
  }

  const user = {};
  bcrypt.hash(req.body.password, salt) // + function()???? return Promise?
  .then(hashPassword => {
    user = new User({
      email: req.body.email,
      password: hashPassword
    })
  })
};

exports.loginUser = (req, res, next) => {
  User.findOne({ email: req.body.emai })
  

  //Authorization
};