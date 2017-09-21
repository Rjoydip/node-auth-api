"use strict";


let root = module.exports = exports = {};

root.index = (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "Welcome to delivery api service"
        }
    });
};

root.version = (req, res) => {
    res.send({
        status: 200,
        data: {
            version: require("../../package.json").version 
        }
    });
};