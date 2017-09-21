"use strict";
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const apiPrifix = '/api/v1/';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 8100));

//  Connect all our routes to our application
app.use(apiPrifix, require('./routes/root'));

module.exports = exports = app;