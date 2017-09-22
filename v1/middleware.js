"use strict";
var HTTPStatus = require('http-status');

module.exports.logger = (req, res, next) => {
    console.log(new Date(), req.method, req.url);
    next();
};

module.exports.isAuthenticated = (req, res, next) => {

    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user !== undefined || req.session !== undefined)
        if(req.session.auth || req.user.authenticated)
            return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.send({
        status: 401,
        error: {
            message: HTTPStatus[401]
        }
    });
}