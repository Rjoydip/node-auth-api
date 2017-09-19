"use strict";
const auth = require("../routes/auth");

const apiPrifix = '/api/v1';

module.exports = (app) => {
    app.use(apiPrifix + '/', (req, res) => {
        res.send({
            status: 200,
            data: {
                message: "Welcome to delivery api"
            }
        });
    });

    app.use(apiPrifix + '/auth', auth);
};