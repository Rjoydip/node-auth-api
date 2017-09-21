"use strict";
const MongoClient = require('mongodb').MongoClient;
const mongo_url = process.env.MONGOLAB_URI;

let DB_CONNECTION_STATUS = false;

let DB = module.exports = exports => {};

DB.init = () => {
    MongoClient.connect(mongo_url, function (err, db) {
        if (err) done(err);
        else {
            DB_CONNECTION_STATUS = true;
            console.log("DB running status ->", DB_CONNECTION_STATUS);
        }
    });
};

DB.init();