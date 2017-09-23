"use strict";
const router = require('express').Router();
const {
    notFound
} = require("./middleware");
const {
    resPayload
} = require("./utils");
const {
    API_PREFIX
} = require("./configs");
const rootCtrl = require("./controller/root");

// middleware for app

// root routes collections
router.use('', require("./routes/root"));
// authentication routes collections
router.use(API_PREFIX + '/auth', require("./routes/auth"));

// if route not found
router.use(notFound);

// exports hole router
module.exports = router;