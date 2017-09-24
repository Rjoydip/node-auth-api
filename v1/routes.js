"use strict";
const router = require('express').Router();
const {
    API_PREFIX
} = require("./configs");

// root routes collections
router.use('', require("./routes/root"));
// authentication routes collections
router.use(API_PREFIX + '/auth', require("./routes/auth"));

// exports hole router
module.exports = router;