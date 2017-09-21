"use strict";
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({
        status: 200,
        data: {
            message: "Welcome to delivery api service"
        }
    });
});

module.exports = router;