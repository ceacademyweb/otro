const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  fase: {
    type: String,
  },
  createByName: {
    type: String,
  },
  createById: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
