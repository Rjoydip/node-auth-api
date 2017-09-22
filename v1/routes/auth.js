"use strict";

const router = require('express').Router();
const authCtrl = require("../controller/auth");

router.get('/', authCtrl.index);
router.get('/users', authCtrl.users);
router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);

module.exports = router;