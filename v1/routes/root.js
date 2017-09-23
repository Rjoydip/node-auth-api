"use strict";

const router = require('express').Router();
const rootCtrl = require("../controller/root");

router.get('/', rootCtrl.index);
router.get('/version', rootCtrl.version);

module.exports = router;