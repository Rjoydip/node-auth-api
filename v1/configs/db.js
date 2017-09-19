"use strict";
var MongoClient = require('mongodb').MongoClient;
var mongo_url = process.env.MONGOLAB_URI;

module.exports = (done) => {
    MongoClient.connect(mongo_url, function (err, db) {
        if (err) done(err);
        else done(db);
    });
}