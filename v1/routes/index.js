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

// middleware for app
router.use(logger);
router.use(isAuthenticated);

// root routes collections
router.get('/', rootCtrl.index);
router.get('/version', rootCtrl.version);
// authentication routes collections
router.use('/auth', require("../routes/auth"));
// if route not found
router.use((req, res, next) => {
    if (!req.route)
        resPayload(502, {}, (data) => res.send(data));

    next();
});

// exports hole router
module.exports = router;