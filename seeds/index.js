const mongoose = require('mongoose');
const ballparkdata = require('./ballparkdata');
const Ballpark = require('../models/ballparks');

mongoose.connect('mongodb://localhost:27017/ballparks', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Ballpark.deleteMany({});
    
    for (let i = 0; i < 200; i++) {
        const park = new Ballpark({
            ballpark: `${ballparkdata[0].features[i].properties.Ballpark}`,
            team: `${ballparkdata[0].features[i].properties.Teams[0].Team}`,
            class: `${ballparkdata[0].features[i].properties.Teams[0].Class}`,
            league: `${ballparkdata[0].features[i].properties.Teams[0].League}`,
            x: `${ballparkdata[0].features[i].geometry.coordinates[0]}`,
            y: `${ballparkdata[0].features[i].geometry.coordinates[1]}`
        });

        await park.save();       
    };
}

seedDB().then(() => {
    mongoose.connection.close();
})