"use strict";
const {
    resPayload
} = require("../utils");

let auth = module.exports = exports = {};
const users = [{
        name: "user one",
        country: "India"
    },
    {
        name: "user two",
        country: "Pakistan"
    },
    {
        name: "user three",
        country: "bangladesh"
    }
];


auth.index = (req, res) => {
    resPayload(200, {}, (data) => res.send(data));
};

auth.users = (req, res) => {
    resPayload(200, {
        users
    }, (data) => res.send(data));
};

auth.login = (req, res) => {
    resPayload(200, {
        message: "Login successfull"
    }, (data) => res.send(data));
};

auth.register = (req, res) => {
    res.send({
        status: 200,
        success: true,
        data: {
            message: "Registration successfull"
        }
    });
}