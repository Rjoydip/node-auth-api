"use strict";
const {
    resPayload
} = require("../utils");

let root = module.exports = exports = {};

root.index = (req, res) => {
    res.render('index', {
        title: "Welcome to delivery api system"
    });
};

root.version = (req, res) => {
    return resPayload(200, {
        version: require("../../package.json").version
    }, (data) => res.send(data));
};