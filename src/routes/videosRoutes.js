const express = require('express');
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middlelwares/authMiddleware');

const routesvideos = express.Router();

routesvideos.get('/videos', videoController.index);
routesvideos.get('/video/:id', videoController.show);

routesvideos.post('/video', authMiddleware, videoController.store);
routesvideos.post('/video/llenar', authMiddleware, videoController.llenar);
routesvideos.put('/video/:id', authMiddleware, videoController.update);
routesvideos.delete('/video/:id', authMiddleware, videoController.videoDelete);

module.exports = routesvideos;
