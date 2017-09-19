const mongoose = require('mongodb');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const routes = require('./v1/routes');
require('dotenv').config();

const app = express();

let _db,
    apiPrifix = '/api/v1/';

// db config
require("./v1/configs/db")(
  (db) => _db = db
);

// routes config
require('./v1/routes')(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});