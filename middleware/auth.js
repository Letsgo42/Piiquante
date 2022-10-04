 const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //if (!req.headers.authorization.startsWith('Bearer'))
  // res.status(401).send({ error });
  //console.log(req.body)

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    req.auth = { userId: userId };
    next();
  } catch(error) {
    res.status(401).json({ error });
  }
 };
