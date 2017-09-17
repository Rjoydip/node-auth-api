var mongoose = require('mongodb');
var express = require('express');
var favicon = require('serve-favicon')

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

app.get('*', function (req, res) {
  db.collection('quotes').save({
    "_id": Math.random(),
    "name": "quotes one"
  }, (err, result) => {
    if (err) console.log(err);
    else console.log(result);
  });

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
  db.collection('quotes').save(req.body, (err, result) => {
    if (err)
      res.send({
        status: 404,
        data: {
          message: "Data not found"
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