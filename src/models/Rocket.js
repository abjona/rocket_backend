const mongoose = require('mongoose');

const RocketSchema = mongoose.Schema({
  model: String,
  price: Number,
  dates: [Date],
  accents: Number,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }
});

module.exports = mongoose.model('Rocket', RocketSchema);
