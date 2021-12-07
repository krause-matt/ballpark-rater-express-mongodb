const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BallparkSchema = new Schema({
    ballpark: String,
    team: String,
    class: String,
    league: String,
    longitude: Number,
    latitude: Number,
    image: String
});

module.exports = mongoose.model('Ballpark', BallparkSchema);