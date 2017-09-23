"use strict";
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const {
    resPayload
} = require("../utils");
const {
    SUPER_SECRET
} = require("../configs/index");
const User = require("../model/user");

let auth = module.exports = exports = {};

auth.index = (req, res) => {
    return resPayload(200, {
        message: "Welcome to delivery api authentication service"
    }, (data) => res.send(data));
};

auth.user = (req, res) => {
    User.find({
        username: req.body.username
    }, function (err, users) {
        if (err)
            return resPayload(400, {
                message: err
            }, (data) => res.send(data));

        return resPayload(200, {
            users
        }, (data) => res.send(data));
    });
};

auth.users = (req, res) => {
    User.find({}, function (err, users) {
        if (err)
            return resPayload(400, {
                message: err
            }, (data) => res.send(data));

        return resPayload(200, {
            users
        }, (data) => res.send(data));
    });
};

auth.login = (req, res) => {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err)
            return resPayload(400, {
                message: err
            }, (data) => res.send(data));

        if (!user)
            return resPayload(400, {
                message: 'Authentication failed. User not found.'
            }, (data) => res.send(data));

        if (req.body.password !== user.password)
            return resPayload(400, {
                message: 'Authentication failed. Wrong password.'
            }, (data) => res.send(data));
        else {
            let token = jwt.sign({
                username: user.username
            }, SUPER_SECRET, {
                expiresIn: '10m',
                algorithm: 'HS256'
            });

            User.update({
                _id: user._id
            }, {
                token
            }, () => {
                return resPayload(200, {
                    token
                }, (data) => res.send(data));
            });
        }
    });
};

auth.register = (req, res) => {
    // create a sample user
    let token = req.body.token = jwt.sign({
        username: req.body.username
    }, SUPER_SECRET, {
        expiresIn: '10m',
        algorithm: 'HS256'
    });

    let user = new User(req.body);
    user.save((err) => {
        if (err)
            return resPayload(400, {
                message: err
            }, (data) => res.send(data));;

        return resPayload(200, {
            message: "Registration successfully",
            token,
        }, (data) => res.send(data));
    });
}