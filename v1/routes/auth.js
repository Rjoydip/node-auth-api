"use strict";

const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "Welcome to delivery api authentication service"
        }
    });
});

routes.get('/users', (req, res) => {
    res.send({
        status: 200,
        data: {
            users: [
                {
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
});

routes.post('/login', (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "Login successfull"
        }
    });
});

routes.post('/registration', (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "Registration successfull"
        }
    });
});

module.exports = routes;