"use strict";
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const {
    API_PREFIX,
    SUPER_SECRET
} = require("../configs");
const {
    sendMail,
    resPayload
} = require("../utils");
const Users = require("../model/users");

let auth = module.exports = exports = {};

auth.index = (req, res) => {
    return resPayload(404, "Welcome to delivery api authentication service", (data) => res.send(data));
};

auth.user = (req, res) => {
    Users
        .findOne({
            $or: [{
                username: req.body.username
            }, {
                email: req.body.email
            }]
        })
        .select(['-password', '-token', '-resetTokenExpires', '-created_at', '-updated_at', '-__v'])
        .exec()
        .then(user => {
            if (!user) resPayload(200, "User not found", (data) => res.send(data))
            resPayload(200, user, (data) => res.send(data))
        }).catch(err => resPayload(404, err, (data) => res.send(data)));
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

            if (user.resetToken === '' || user.resetToken === null)
                return resPayload(404, "Token expired", (data) => res.send(data));

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err)
                    return resPayload(404, err, (data) => res.send(data));

                // Store hash in database
                user.password = hash;
                user.resetToken = '';
                user.resetTokenExpires = Date.now() + 3600000;

                user.save(err => {
                    if (err)
                        return resPayload(404, err.errors.resetTokenExpires, (data) => res.send(data));

                    sendMail({
                        user,
                        subject: "Password has been reset",
                        text: `Your password has been reset successfully`
                    }, (error, info) => {
                        if (error)
                            return resPayload(404, error, (data) => res.send(data));

                        return resPayload(200, "Password reset successfully", (data) => res.send(data));
                    }); // sendMail end
                });
            }); // bcrypt end
        }) // then end
        .catch(err => resPayload(404, err, (data) => res.send(data)));
};

auth.forgot = (req, res) => {
    Users
        .findOne({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (!user)
                return resPayload(404, "Email not registered", (data) => res.send(data));

            crypto.randomBytes(30, (err, buf) => {
                if (err)
                    return resPayload(404, err, (data) => res.send(data));

                user.resetToken = buf.toString('hex');
                user.resetTokenExpires = Date.now() + 3600000; // 1 hour

                sendMail({
                    user,
                    subject: "Reset your password",
                    text: `Here is your reset password link. \nhttp://${req.headers.host}${API_PREFIX}/auth/reset/${user.resetToken}`
                }, (error, info) => {
                    if (error)
                        return resPayload(404, error, (data) => res.send(data));

                    user.save(err => {
                        if (err)
                            return resPayload(404, "Oops! faild to saved token. Please try again!", (data) => res.send(data));

                        return resPayload(200, info, (data) => res.send(data));
                    });
                });
            });
        })
        .catch(err => resPayload(404, err, (data) => res.send(data)));
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

            bcrypt.compare(req.body.password, user.password, (err, matched) => {

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

                user.token = token;

                user.update(err => {
                    if (err)
                        return resPayload(404, {
                            err
                        }, (data) => res.send(data));

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
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err)
            return resPayload(404, err, (data) => res.send(data));

        req.body.password = hash; // Store hash in database
        let user = new Users(req.body);
        user.save((err) => {
            if (err)
                return resPayload(404, err, (data) => res.send(data));

            sendMail({
                user,
                subject: "Welcome to delivery api system",
                text: `Hi ! I am the admin of this system welcome to here`
            }, (error, info) => {
                if (error)
                    return resPayload(404, error, (data) => res.send(data));

                return resPayload(200, info, (data) => res.send(data))
            });

            return resPayload(200, "Registration successfully", (data) => res.send(data));
        });
    });
}