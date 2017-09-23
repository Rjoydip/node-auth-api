"use strict";

const router = require('express').Router();
const authCtrl = require("../controller/auth");
const {
    verifyToken,
} = require("../middleware");

router.get('/', authCtrl.index);
router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.post('/user', verifyToken, authCtrl.user);

module.exports = router;