"use strict";
const {
    resPayload
} = require("../utils");

let root = module.exports = exports = {};

root.index = (req, res) => {
    resPayload(200, {
        message: "Welcome to delivery api service"
    }, (data) => res.send(data));
};

root.version = (req, res) => {
    resPayload(200, {
        version: require("../../package.json").version
    }, (data) => res.send(data));
};