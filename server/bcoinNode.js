'use strict';

var bcoin = require('bcoin');
var net = require('net');
var fs = require('fs');
var bn = require('bn.js');

// Standard bitcoin seeds
var seeds = [
  'seed.bitcoin.sipa.be',
  'dnsseed.bluematt.me',
  'dnsseed.bitcoin.dashjr.org',
  'seed.bitcoinstats.com',
  'seed.bitnodes.io',
  'bitseed.xf2.org'
];

var index = 0;
module.exports = new bcoin.pool({
  // Number of peers allowed
  size: 32,
  // This function must return a socket that supports the standard
  // node socket model: `write()`, `destroy()` `on('data')`, etc.
  createConnection: function() {
    if (index >= seeds.length) {
      index = 0;
    }

    var addr = seeds[index++];
    var parts = addr.split(':');
    var host = parts[0];
    var port = +parts[1] || 8333;
    var socket = net.connect(port, host);

    socket.on('connect', function() {
      // console.log('Connected to %s:%d', host, port);
    });

    return socket;
  },
  // Storage DB for transactions and wallet, must support
  // the levelup `put`/`del`/`createReadStream` methods.
  storage: require('levelup')(process.env.HOME + '/.bcoin', {
    db: require('leveldown'),
    valueEncoding: 'json'
  })
});

// pool.on('error', function(err) {
//   ;
// });

// // Receive the address of another peer.
// pool.on('addr', function(data, peer) {
//   var host = data.ipv4 + ':' + data.port;
//   if (!~seeds.indexOf(host)) {
//     console.log('Found new peer: %s', host);
//     seeds.push(host);
//   }
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
//   console.log('**************************', total.toString());
//   console.log('Received transaction %s from %s.', hash, ip);
// });
