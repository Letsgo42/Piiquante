const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const passwordValidator = require('password-validator');

// SET SCHEMA FOR PASSWORD VALIDATOR
const passwordSchema = new passwordValidator();
passwordSchema
.is().min(6)
.is().max(100)
// .has().uppercase()
// .has().lowercase()
// .has().digits()
// .has().symbols()
// .has().not().spaces();


// POST NEW USER : api/auth/signup
exports.registerUser = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).json({ message: 'Invalid Password'});
  }
  
  bcrypt.hash(req.body.password, 10)
  .then(hashPassword => {
    const user = new User({
      email: req.body.email,
      password: hashPassword
    })
    user.save()
    .then(() => res.status(201).json({ message: 'New user registered' }))
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};


// POST LOGIN USER: api/auth/login
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    //console.log(user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } 
    bcrypt.compare(req.body.password, user.password)
    .then(validPassword => {
      if (!validPassword) {
        return res.status(401).json({ message: 'Incorrect password' });
      } 
      const payload = { userId: user._id };
      const token = jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: '24h' });
      //console.log(token);
      res.status(200).json({ userId: user._id, token: token });
      next();
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(404).json({ error }));
};
