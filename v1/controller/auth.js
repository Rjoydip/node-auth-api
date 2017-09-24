"use strict";
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const {
    API_PREFIX
} = require("../configs");
const {
    sendMail,
    resPayload
} = require("../utils");
const {
    SUPER_SECRET
} = require("../configs/index");
const Users = require("../model/users");

let auth = module.exports = exports = {};

auth.index = (req, res) => {
    return resPayload(404, "Welcome to delivery api authentication service", (data) => res.send(data));
};

auth.user = (req, res) => {
    Users
        .findOne({
            username: req.body.username
        })
        .select(['-password', '-token', '-resetTokenExpires', '-created_at', '-updated_at', '-__v'])
        .exec()
        .then(
            user => resPayload(200, user, (data) => res.send(data))
        ).catch(
            err => resPayload(404, err, (data) => res.send(data))
        );
};

auth.users = (req, res) => {
    Users
        .find()
        .select(['-password', '-token', '-resetTokenExpires', '-created_at', '-updated_at', '-__v'])
        .exec()
        .then(users => resPayload(200, users, (data) => res.send(data)))
        .catch(err => resPayload(404, err, (data) => res.send(data)));
};

auth.matchToken = (req, res) => {
    Users.findOne({
            resetToken: req.params.token,
            resetTokenExpires: {
                $gt: Date.now()
            }
        })
        .exec()
        .then(user => {
            if (!user)
                return resPayload(404, "User not found", (data) => res.send(data));

            return resPayload(200, {
                token: req.params.token
            }, (data) => res.send(data));
        }).catch(
            err => resPayload(404, err, (data) => res.send(data))
        );
};

auth.setToken = (req, res) => {
    Users
        .findOne({
            resetToken: req.params.token,
            resetTokenExpires: {
                $gt: Date.now()
            }
        })
        .exec()
        .then(user => {
            if (!user) {
                return res.redirect('back');
            }
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err)
                    return resPayload(404, err, (data) => res.send(data));

                // Store hash in database
                user.password = hash;
                user.resetToken = undefined;
                user.resetTokenExpires = undefined;

                user.save((err) => {
                    if (err)
                        return resPayload(404, "Oops! password doesn't saved. Please try again!", (data) => res.send(data));

                    return resPayload(200, "Password saved successfully", (data) => res.send(data));
                });
            });
        }).catch(
            err => resPayload(404, err, (data) => res.send(data))
        );
};

auth.forgot = (req, res) => {
    Users
        .findOne({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (!user)
                return resPayload(404, "User not found", (data) => res.send(data));

            crypto.randomBytes(20, function (err, buf) {
                if (err)
                    return resPayload(404, err, (data) => res.send(data));

                user.resetToken = buf.toString('hex');
                user.resetTokenExpires = Date.now() + 3600000; // 1 hour

                sendMail(user, user.resetToken, req.headers.host, (error, info) => {
                    if (error)
                        return resPayload(404, error, (data) => res.send(data));

                    user.save(function (err) {
                        if (err)
                            return resPayload(404, "Oops! faild to saved token. Please try again!", (data) => res.send(data));

                        return resPayload(200, info, (data) => res.send(data));
                    });
                });
            });
        }).catch(
            err => resPayload(404, err, (data) => res.send(data))
        );
};

auth.login = (req, res) => {
    Users
        .findOne({
            username: req.body.username
        })
        .exec()
        .then(user => {
            if (!user)
                return resPayload(404, 'User not found.', (data) => res.send(data));

            bcrypt.compare(req.body.password, user.password, function (err, matched) {
                if (err) // Passwords match
                    return resPayload(404, 'Authentication failed. Wrong password.', (data) => res.send(data));

                if (!matched)
                    return resPayload(404, "Wrong password.", (data) => res.send(data));

                let token = jwt.sign({
                    username: user.username
                }, SUPER_SECRET, {
                    expiresIn: '10m',
                    algorithm: 'HS256'
                });

                Users.update({
                    _id: user._id
                }, {
                    token
                }, () => {
                    return resPayload(200, {
                        token
                    }, (data) => res.send(data));
                });
            });
        })
        .catch(
            err => resPayload(404, err, (data) => res.send(data))
        );
};

auth.register = (req, res) => {
    // create a sample user
    let token = req.body.token = jwt.sign({
        username: req.body.username
    }, SUPER_SECRET, {
        expiresIn: '10m',
        algorithm: 'HS256'
    });

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err)
            return resPayload(404, err, (data) => res.send(data));

        req.body.password = hash; // Store hash in database
        let user = new Users(req.body);
        user.save((err) => {
            if (err)
                return resPayload(404, err, (data) => res.send(data));;

            return resPayload(200, "Registration successfully", (data) => res.send(data));
        });
    });
}