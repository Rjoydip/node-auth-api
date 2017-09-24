"use strict";

const router = require('express').Router();
const authCtrl = require("../controller/auth");
const {
    verifyToken,
} = require("../middleware");

// main route
router.get('/', authCtrl.index);

// authentication
router.post('/forgot', authCtrl.forgot);
router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.get('/reset/:token', authCtrl.matchToken);
router.post('/reset/:token', authCtrl.setToken);

// user routes
router.post('/user', verifyToken, authCtrl.user);
router.get('/users', verifyToken, authCtrl.users);

module.exports = router;