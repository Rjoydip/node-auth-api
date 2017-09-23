"use strict";
const router = require('express').Router();
const {
    notFound
} = require("./middleware");
const rootCtrl = require("./controller/root");
const {
    resPayload
} = require("./utils");

// middleware for app

// root routes collections
router.use('', require("./routes/root"));
// authentication routes collections
router.use('/auth', require("./routes/auth"));

// if route not found
router.use(notFound);

// exports hole router
module.exports = router;