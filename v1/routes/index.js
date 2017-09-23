"use strict";
const HTTPStatus = require('http-status');
const router = require('express').Router();
const {
    logger,
    isAuthenticated
} = require("../middleware");
const rootCtrl = require("../controller/root");
const {
    resPayload
} = require("../utils");

router.use(logger);
router.use(isAuthenticated);

router.get('/', rootCtrl.index);
router.get('/version', rootCtrl.version);

router.use('/auth', require("../routes/auth"));

router.use(function (req, res, next) {
    if (!req.route)
        resPayload(502, {}, (data) => res.send(data));
    next();
});

module.exports = router;