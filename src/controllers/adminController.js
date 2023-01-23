const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const index = (req, res) => {
  const admins = Admin.find({}, (err, result) => {
    if (err) return res.status(401).send('ha ocurrido un error');
    return res.send(admins);
  });
};

const store = (req, res) => {
  console.log(req.body);
  const admin = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  admin.save(err, (result) => {
    if (err) return res.status(401).send('ha ocurrido un error ' + err.message);
    return res.send({ message: 'Administrador agregado con éxito', result });
  });
};

const show = (req, res) => {
  const _id = req.params.id;
  Admin.find({ _id }, (err, result) => {
    if (err) {
      res.status(4001).json({ message: 'Ha ocurrido un error', err });
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

const destroy = (req, res) => {
  const _id = req.params.id;
  User.findOneAndDelete({ _id }, (err, result) => {
    if (err) {
      res.status(401).json({ message: 'Ha ocurrido un error', err });
    } else {
      res.send('Video borrado');
    }
  });
};

const login = (req, res) => {
  Admin.findOne({ email: req.body.email }, (err, result) => {
    if (err) res.status(400).send('ha ocurrido un error');
    if (result) {
      const ud = {
        id: result.id,
        name: result.name,
        email: result.email,
        admin: result.admin,
      };
      if (bcrypt.compareSync(req.body.password, result.password)) {
        jwt.sign(
          { admin: result },
          process.env.SECRET_KEY,
          { expiresIn: '86400000ms' },
          (err, token) => {
            console.log({ message: 'Autencicacion Correcta', token });
            res.json({
              message: 'Autenticacion Correcta',
              adminData: ud,
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
module.exports = {
  index,
  store,
  login,
  update,
  destroy,
  show,
};
