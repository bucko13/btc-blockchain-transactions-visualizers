'use strict';

var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

var bcoin = require('bcoin');
var pool = require('./bcoinNode');
var bn = require('bn.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/../client/'));


app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

server.listen(app.get('port'), '127.0.0.1', function() {
    console.log('Node app is running on port', app.get('port'));
});


pool.on('error', function(err) {
  ;
});


io.on('connection', function(socket) {
  // Receive a transaction.
  pool.on('tx', function(tx, peer) {
    var hash = bcoin.utils.revHex(tx.hash('hex'));
    var ip = peer.socket.remoteAddress;
    var hash = bcoin.utils.revHex(tx.hash('hex'));
    let total = 0;
    tx.outputs.forEach((output) => {
      total += output.value;
    });
    total = new bn(total);
    const data = {
      amount: total.toString(),
      tx: hash,
    }

    console.log('emitting a transaction: ', data);
    socket.emit('transaction', data);
    // const message = JSON.stringify(data);
    // console.log('**************************', total.toString());
    // console.log('Received transaction %s from %s.', hash, ip);
  });
  
});