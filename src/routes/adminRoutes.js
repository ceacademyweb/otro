const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/AuthUserController');
const authMiddleware = require('../middlelwares/authMiddleware');

const adminRoutes = express.Router();

adminRoutes.get('/', adminController.index);
adminRoutes.get('/users/nuevos', authController.usersNew);
adminRoutes.get('/auth', authController.index);
adminRoutes.get('/auth/:id', authController.updatePassword);
adminRoutes.post('/', adminController.store);
adminRoutes.get('/:id', adminController.show);
adminRoutes.post('/login', adminController.login);
adminRoutes.put('/:id', adminController.update);
adminRoutes.delete('/:id', adminController.destroy);

module.exports = adminRoutes;
