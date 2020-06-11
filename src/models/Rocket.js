const mongoose = require('mongoose');

const RocketSchema = mongoose.Schema({
    model: String,
    price: Number,
    dates: [Date],
    accents: Number
});

module.exports = mongoose.model('Rocket', RocketSchema);