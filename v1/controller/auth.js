"use strict";

let auth = module.exports = exports = {};

auth.index = (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "Welcome to delivery api authentication service"
        }
    });
};

auth.users = (req, res) => {
    res.send({
        status: 200,
        data: {
            users: [{
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
            ]
        }
    });
};

auth.login = (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "Login successfull"
        }
    });
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