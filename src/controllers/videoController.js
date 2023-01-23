const Video = require('../models/Video');
const urlpage = 'https://stunning-mandazi-a6d131.netlify.app';
const videosList = [
  {
    name: 'ESTRUCTURA DE MERCADO',
    url: `${urlpage}/estructura_de_mercado.mp4`,
  },
  {
    name: 'ESTRUCTURA DE MERCADO',
    url: `${urlpage}/estructura_de_mercado.mp4`,
  },
  {
    name: 'INTRODUCCION A LA COMUNIDAD',
    url: `${urlpage}/introduccion_a_la_comunidad.mp4`,
  },
  {
    name: 'RISK MANAGEMENT',
    url: `${urlpage}/risk_management.mp4`,
  },
  {
    name: 'RR',
    url: `${urlpage}/rr.mp4`,
  },
];

const index = (req, res) => {
  Video.find({}, (err, result) => {
    if (err) {
      res.status(4001).json({ message: 'Ha ocurrido un error', err });
    } else {
      res.send(result);
    }
  });
};

const show = (req, res) => {
  const _id = req.params.id;
  Video.find({ _id }, (err, result) => {
    if (err) {
      res.status(4001).json({ message: 'Ha ocurrido un error', err });
    } else {
      res.send(result);
    }
  });
};

const store = (req, res) => {
  // res.send(req.body);
  const video = new Video({
    name: req.body.name,
    url: req.body.url,
    fase: req.body.fase,
    active: req.body.active,
    createById: '63c1c45896fed4d5dab67bd9',
    createByName: 'Florentino',
  });
  // res.send(video);
  video.save((err, result) => {
    if (err) {
      res.status(401).json({ message: 'ha ocurrido un error', error: err });
    } else {
      res.send(result);
    }
  });
};

const update = (req, res) => {
  const _id = req.params.id;
  const data = req.body;
  Video.findOneAndUpdate({ _id }, data, (err, result) => {
    if (err) {
      res.status(401).json({ message: 'Ha ocurrido un error', err });
    } else {
      res.send(result);
    }
  });
};

const videoDelete = (req, res) => {
  const _id = req.params.id;
  Video.findOneAndDelete({ _id }, (err, result) => {
    if (err) {
      res.status(401).json({ message: 'Ha ocurrido un error', err });
    } else {
      res.send('Video borrado');
    }
  });
};

const llenar = (req, res) => {
  const resultAll = [];
  videosList.forEach((el) => {
    const video = new Video({
      name: el.name,
      url: el.url,
      active: true,
      createById: req.user.user._id,
      createByName: req.user.user.name,
    });
    video.save((err, result) => {
      if (err) return res.send({ err });
      resultAll.push(result);
    });
  });
  res.send(resultAll);
};

module.exports = {
  index,
  store,
  show,
  llenar,
  update,
  videoDelete,
};
