const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const verifyToken = (token) => {
  // console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, (err, userData) => {
    if (err) {
      return null;
    } else {
      console.log(userData);
      return;
    }
  });
};

module.exports = verifyToken;
