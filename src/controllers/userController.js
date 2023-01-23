const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const index = (req, res) => {
  console.log(req.body.user);
  User.find({}, (err, result) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.json({ currentUser: req.user, result });
    }
  });
};

const store = (req, res) => {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    discordId: req.body.discordId,
    telegramId: req.body.telegramId,
    phone: req.body.name,
    codeMember: req.body.codeMember,
    // password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save((err, result) => {
    if (err) {
      res.status(401).send('ha ocurrido un error ' + err);
    } else {
      res.send(result);
    }
  });
};

const update = (req, res) => {
  const _id = req.params.id;
  const data = req.body;
  User.findOneAndUpdate({ _id }, data, (err, result) => {
    if (err) {
      res.status(401).json({ message: 'Ha ocurrido un error', err });
    } else {
      res.send(result);
    }
  });
};

const userDelete = (req, res) => {
  const _id = req.params.id;
  User.findOneAndDelete({ _id }, (err, result) => {
    if (err) {
      res.status(401).json({ message: 'Ha ocurrido un error', err });
    } else {
      res.send('Video borrado');
    }
  });
};

const show = (req, res) => {
  const _id = req.params.id;
  User.find({ _id }, (err, result) => {
    if (err) {
      res.status(4001).json({ message: 'Ha ocurrido un error', err });
    } else {
      res.send(result);
    }
  });
};

const login = (req, res) => {
  console.log('login');
  User.findOne({ email: req.body.email }, (err, result) => {
    if (err) res.status(400).send('ha ocurrido un error');
    if (result) {
      const ud = {
        id: result.id,
        name: result.name,
        email: result.email,
        active: result.active,
      };
      if (bcrypt.compareSync(req.body.password, result.password)) {
        jwt.sign(
          { user: result },
          process.env.SECRET_KEY,
          { expiresIn: '86400000ms' },
          (err, token) => {
            console.log({ message: 'Autencicacion Correcta', token });
            res.json({
              message: 'Autenticacion Correcta',
              userData: ud,
              token,
              status: 200,
            });
          }
        );
      } else {
        res.send({ message: 'NO autorizado', status: 401 });
      }
    } else {
      res.send({ message: 'El Correo no existes', status: 401 });
    }
  });
};

const logout = (req, res) => {
  res.send(req.token);
};

module.exports = {
  index,
  store,
  login,
  logout,
  update,
  userDelete,
  show,
};
