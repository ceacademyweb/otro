const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlelwares/authMiddleware');

const routesUsers = express.Router();

routesUsers.get('/users', authMiddleware, userController.index);
routesUsers.get('/user/:id', userController.show);

routesUsers.post('/users', userController.store);
routesUsers.post('/login', userController.login);
routesUsers.post('/logout', authMiddleware, userController.logout);
routesUsers.put('/user/:id', authMiddleware, userController.update);
routesUsers.delete('/user/:id', authMiddleware, userController.userDelete);

module.exports = routesUsers;
