const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

require('dotenv').config();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.set('port', (process.env.PORT || 8100));

let _db,
  apiPrifix = '/api/v1/';

// db config
require("./v1/configs/db")(
  (db) => _db = db
);

//  Connect all our routes to our application
app.use(apiPrifix, require('./v1/routes/root'));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});