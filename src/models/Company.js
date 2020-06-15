const mongoose = require('mongoose');

const Company = new mongoose.Schema({
  name: String,
  rating: [Number]
});

module.exports = mongoose.model('Company', Company);
