const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  admin: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
