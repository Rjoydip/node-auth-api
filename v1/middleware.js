"use strict";
const HTTPStatus = require('http-status');
const {
    resPayload
} = require("./utils");
const {
    secret
} = require("./configs/index");

module.exports.logger = (req, res, next) => {
    process.stdout.write(`\n${new Date(), req.method, req.url}`);
    next();
};

module.exports.isAuthenticated = (req, res, next) => {

    // do any checks you want to in here

    if (req.user === undefined || req.session === undefined) {
        req.user = {};
        req.session = {};
        req['user']['authenticated'] = secret;
    }

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user !== undefined || req.session !== undefined)
        if (req.session.auth || req.user.authenticated)
            return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    resPayload(401, {}, (data) => res.send(data));
}