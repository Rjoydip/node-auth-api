"use strict";

const router = require('express').Router();
const authCtrl = require("../controller/auth");
const {
    verifyToken,
} = require("../middleware");

router.get('/', authCtrl.index);
router.get('/reset', authCtrl.reset);
router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.get('/user', verifyToken, authCtrl.index);
router.get('/users', verifyToken, authCtrl.users);

module.exports = router;