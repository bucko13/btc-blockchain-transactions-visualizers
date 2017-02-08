'use strict';

var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

var bcoin = require('bcoin');
// var pool = require('./bcoinNode');
var bn = require('bn.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/../client/'));


app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

io.on('connection', (socket) => {
  // pool.on('error', function(err) {
  //   ;
  // });

  // // Receive a transaction.
  // pool.on('tx', function(tx, peer) {
  //   var hash = bcoin.utils.revHex(tx.hash('hex'));
  //   var ip = peer.socket.remoteAddress;
  //   let total = 0;
  //   tx.outputs.forEach((output) => {
  //     const value = new bn(output.value);
  //     total += value;
  //   });
  //   const data = {
  //     amount: total,
  //   }
  //   const message = JSON.stringify(data);
  //   socket.emit('transactions', message);
  //   console.log('**************************', total.toString());
  //   // console.log('Received transaction %s from %s.', hash, ip);
  // });
});