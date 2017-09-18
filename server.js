var mongoose = require('mongodb');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

require('dotenv').config();

var app = express();

var mongo_url = process.env.MONGOLAB_URI;

var db;

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(mongo_url, function (err, _db) {
  // Paste the following examples here
  if (err) console.log(err);
  db = _db;
});

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})

app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.set('port', (process.env.PORT || 8000));

app.get('/', function (req, res) {
  res.send({
    status: 200,
    data: {
      message: "Welcome to delivery api"
    }
  });
});

app.get('/users', (req, res) => {
  db.collection('users').find().toArray((err, result) => {
    if (err)
      res.send({
        status: 404,
        error: {
          message: err
        }
      });

    res.send({
      status: 200,
      data: result
    })
  })
});


app.post('/login', (req, res) => {
  db.collection('users').find({
    "username": req.body.username
  }).toArray((err, result) => {
    if (err)
      res.send({
        status: 404,
        error: {
          message: err
        }
      });

    res.send({
      status: 200,
      data: result
    })
  })
});

app.post('/registration', jsonParser, (req, res) => {
  if (req.body._id === undefined) req.body._id = Date.now().toString();
  db.collection('users').save(req.body, (err, result) => {
    if (err)
      res.send({
        status: 404,
        error: {
          message: err
        }
      });

    res.send({
      status: 200,
      data: {
        message: "Users registered successfully"
      }
    });
  });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});