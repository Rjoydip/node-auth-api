"use strict";
const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "Welcome to delivery api service"
        }
    });
});

module.exports = routes;