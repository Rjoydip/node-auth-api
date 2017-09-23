"use strict";

//Import the mongoose module
const mongoose = require('mongoose');
const {
    MONGOLAB_URI
} = require("./index");

console.log(MONGOLAB_URI);

//Set up default mongoose connection
mongoose.connect(process.env.MONGOLAB_URI || MONGOLAB_URI, {
    useMongoClient: true
});

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

module.exports = db;