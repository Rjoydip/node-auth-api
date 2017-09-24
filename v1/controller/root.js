"use strict";
const {
    resPayload
} = require("../utils");

let root = module.exports = exports = {};

root.index = (req, res) => {
    return resPayload(200, "Welcome to delivery api system", (data) => res.send(data));
};

root.version = (req, res) => {
    return resPayload(200, {
        version: require("../../package.json").version
    }, (data) => res.send(data));
};