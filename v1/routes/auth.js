"use strict";

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "Welcome to delivery api authentication service"
        }
    });
});

router.get('/users', (req, res) => {
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

router.post('/login', (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "Login successfull"
        }
    });
});

router.post('/registration', (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "Registration successfull"
        }
    });
});

module.exports = router;