"use strict";
var HTTPStatus = require('http-status');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "Welcome to delivery api service"
        }
    });
});

router.get('/version', (req, res) => {
    res.send({
        status: 200,
        data: {
            version: require("../../package.json").version 
        }
    });
});

router.use('/auth', require("../routes/auth"));

router.use(function (req, res, next) {
    if (!req.route)
        res.send({
            status: 502,
            error: {
                message: HTTPStatus[502]
            }
        });
    next();
});

module.exports = router;