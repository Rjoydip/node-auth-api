var mongoose = require('mongodb');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();

require("./_env");

var mongo_url = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  `mongodb://${process.env.MLAB_DB_USER}:${process.env.MLAB_DB_PASSWORD}@ds139954.mlab.com:39954/dabba-delivery`;

var db;

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(mongo_url, function (err, _db) {
  // Paste the following examples here
  if (err) console.log(err);
  db = _db;
});

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

app.post('/quotes', (req, res) => {
  if (req.body._id !== undefined) {
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
  } else {
    res.send({
      status: 404,
      data: {
        error: {
          message: "_id not found"
        }
      }
    });
  }
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});