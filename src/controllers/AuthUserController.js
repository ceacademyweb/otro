const User = require('../models/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailTemplate = require('./emailTemplate');

const generarString = (min, max) => {
  let num = Math.floor(Math.random() * (max - min + 1) + min);
  let result = '';
  const minus = 'a b c d e f g h i j k l m n p q r s t u v w x y z'.split(' ');
  const mayus = 'A B C D E F G H I J K L M N P Q R S T U V W X Y Z'.split(' ');
  const characterSpecial = '* / $ +';
  for (i = 0; i <= 3; i++) {
    const random = Math.floor(Math.random() * minus.length);
    result += minus[random];
  }
  for (i = 0; i <= 3; i++) {
    const random = Math.floor(Math.random() * mayus.length);
    result += mayus[random];
  }
  result += num;
  result +=
    characterSpecial[Math.floor(Math.random() * characterSpecial.length)];
  return result;
};

const index = (req, res) => {
  const random = generarString(100, 999);
  console.log(random);
  res.send({ random });
};

const senEmail = (res, data, result) => {
  // return res.send(data);
  let transporter = nodemailer.createTransport({
    host: 'smtppro.zoho.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'info@ceacademy.world', // generated ethereal user
      pass: 'CEAcademy(2023)*', // generated ethereal password
    },
  });
  return transporter.sendMail(
    {
      from: '"Info CEACADEMY" <info@ceacademy.world>', // sender address
      to: result.email, // list of receivers
      subject: 'Cuenta Aceptada', // Subject line
      // text: 'Hello world?', // plain text body
      html: emailTemplate(data, result), // html body
    },
    (err, info) => {
      if (err) res.status(401).send('Ha ocurrido un error: ' + err);
      res.send('email enviado');
    }
  );
};

const usersNew = (req, res) => {
  // return res.send('users nuevos');
  User.find({ new: 1 }, (err, result) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.json({ currentUser: req.user, result });
    }
  });
};

const updatePassword = (req, res) => {
  const random = generarString(100, 999);
  const _id = req.params.id;
  // return res.send(_id);
  const data = {
    password: bcrypt.hashSync(random, 8),
    text: random,
    new: 0,
  };
  // return res.send(data);
  User.findOneAndUpdate({ _id }, data, (err, result) => {
    if (err) {
      res.status(401).json({ message: 'Ha ocurrido un error', err });
    } else {
      // res.send(result);
      senEmail(res, data, result);
    }
  });
};

module.exports = {
  index,
  updatePassword,
  usersNew,
};
