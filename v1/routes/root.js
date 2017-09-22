"use strict";
var HTTPStatus = require('http-status');
const router = require('express').Router();

const {
    logger
} = require("../middleware");

const rootCtrl = require("../controller/root");

router.use(logger);

router.get('/', rootCtrl.index);
router.get('/version', rootCtrl.version);

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