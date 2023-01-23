const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const authMiddleware = (req, res, next) => {
  next();
  // console.log('middleware');
  // const authorization_header = req.headers['authorization'];
  // // console.log(authorization_header);
  // if (authorization_header !== undefined) {
  //   const token = authorization_header.split(' ')[1];
  //   jwt.verify(token, process.env.SECRET_KEY, (err, userData) => {
  //     if (err) res.status(400).json({ message: err.message });
  //     req.token = token;
  //     req.user = userData;
  //     next();
  //   });
  // } else {
  //   res.status(401).json({ message: 'No esta autorizado sin token' });
  // }
};

module.exports = authMiddleware;
