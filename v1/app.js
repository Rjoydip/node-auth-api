"use strict";
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const API_PREFIX = '/api/v1';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.set('port', (process.env.PORT || 8100));

//  Connect all our routes to our application
app.use(API_PREFIX, require('./routes/root'));
module.exports = exports = app;