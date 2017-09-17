var mongoose = require('mongodb');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

require('dotenv').config();

var app = express();

var mongo_url = process.env.MONGOLAB_URI.toString();

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
      message: "Welcome to dabba delivery api"
    }
  });
});

app.get('/quotes', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err)
      res.send({
        status: 404,
        data: {
          error: {
            message: err
          }
        }
      });

    res.send({
      status: 200,
      data: {
        quotes: result
      }
    })
  })
});

app.post('/quotes', jsonParser, (req, res) => {
  if(req.body._id === undefined) req.body._id = Date.now().toString(); 
  db.collection('quotes').save(req.body, (err, result) => {
    if (err)
      res.send({
        status: 404,
        data: {
          error: {
            message: err
          }
        }
      });

    res.send({
      status: 200,
      data: {
        message: "Quotes saved successfully"
      }
    });
  });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});