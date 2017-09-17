var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/server/public'));

// views is directory for all template files
app.set('views', __dirname + '/sever/views/pages');
app.set('view engine', 'html');

app.get('/', function (request, response) {
  response.render('index');
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});