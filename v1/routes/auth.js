"use strict";

const router = require('express').Router();
const {timeLog} = require("../middlewares"); 

// middleware that is specific to this router
router.use(timeLog);

router.get('/', function (req, res) {
    res.send({
        status: 200,
        data: {
            message: "Authentication root"
        }
    });
});

router.get('/users', (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "All users"
        }
    })
});

router.post('/login', (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "login successfull"
        }
    });
});

router.post('/registration', (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "registration successfull"
        }
    });
});

module.exports = router