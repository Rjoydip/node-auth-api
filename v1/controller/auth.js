"use strict";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const {
    resPayload
} = require("../utils");
const {
    SUPER_SECRET
} = require("../configs/index");
const User = require("../model/user");

let auth = module.exports = exports = {};

auth.index = (req, res) => {
    res.render('index', {
        title: "Welcome to delivery api authentication service"
    });
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

auth.reset = (req, res) => {
    User.find({
        email: req.body.email
    }, function (err, users) {
        if (err)
            return resPayload(400, {
                message: err
            }, (data) => res.send(data));

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: 'joydipand@gmail.com',
            to: 'joydipand@gmail.com',
            subject: 'Sending Email using Node and Nodemailer',
            text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
            return resPayload(200, {
                info
            }, (data) => res.send(data));
        });

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
                message: 'User not found.'
            }, (data) => res.send(data));

        bcrypt.compare(req.body.password, user.password, function (err, matched) {
            if (err) // Passwords match
                return resPayload(400, {
                    message: 'Authentication failed. Wrong password.'
                }, (data) => res.send(data));

            if (!matched)
                return resPayload(400, {
                    message: 'Authentication failed. Wrong password.'
                }, (data) => res.send(data));

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
        });
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

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err)
            return resPayload(400, {
                message: err
            }, (data) => res.send(data));;

        // Store hash in database
        req.body.password = hash;
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
    });
}