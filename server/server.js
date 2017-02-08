'use strict';

var express = require('express');
var app = express();

var server = require('http').Server(app);
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/../client/'));


app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
