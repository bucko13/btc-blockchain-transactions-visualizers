;(function() {

'use strict';

const bcoin = require('bcoin').set('main');

const chain = new bcoin.chain({
  db: 'leveldb',
  location: process.env.HOME + '/chain.db',
  spv: true,
});

const pool = new bcoin.pool({ 
  chain: chain, 
  size: 8, 
  spv: true,
});

pool.open((err) => {
  if (err)
    throw err;

  pool.connect();

  pool.startSync();

  // Watch the action
  chain.on('block', function(block) {
    console.log('Connected block to blockchain:');
    console.log(block);
  });

  pool.on('tx', function(tx) {
    console.log('Saw transaction:');
    console.log(tx.rhash);
  });

});

})()