const mongoose = require('mongoose');

const Reservation = new mongoose.Schema({
  date: Date,
  price: Number,
  rate: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rocket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rocket'
  }

});

module.exports = mongoose.model('Reservation', Reservation);
