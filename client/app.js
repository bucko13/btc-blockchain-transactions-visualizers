angular.module('bitcoinApp', [
  'ngWebSocket'
])

.factory('StreamTransactions', function($websocket) {
  // Open a WebSocket connection 
  var dataStream = $websocket('wss://bitcoin.toshi.io');

  var collection = [];
  var totalArray = [];
  var total = 0;

  dataStream.onMessage(function(message) {
    var amount = JSON.parse(message.data).data.amount
    amount = parseFloat(amount > 0 ? (amount / 1e8).toFixed(8) : 0);
    total = total + amount;
    collection.push(amount);
    totalArray.push(Math.round(total * 10000) / 10000);
    // console.log(methods.total);      
  });

  dataStream.onClose(function(data) {
    console.log('stream closed: ', data);
  });

  var methods = {
    collection: collection,
    totalArray: totalArray,
    total: total,
    get: function() {
      dataStream.send(JSON.stringify({ subscribe: 'transactions' }));
    },
  };
  return dataStream;
})

.controller('TransactionData', ['$scope', 'StreamTransactions', 
  function($scope, StreamTransactions) {
    var total = 0;
    var transactions = [];
    StreamTransactions.onMessage(function(message) {
      // console.log(message);
      var amount = JSON.parse(message.data).data.amount;
      amount = parseFloat(amount > 0 ? (amount / 1e8).toFixed(8) : 0);
      total = total + parseFloat(amount);
      transactions.push(amount);
      $scope.totalTransactions = total;
      $scope.transactions = transactions;
    });
    StreamTransactions.send(JSON.stringify({ subscribe: 'transactions' }));
    
    // StreamTransactions.get();
    // var transactions = StreamTransactions.collection;
    // var totalTransactions = StreamTransactions.totalArray;
    // $scope.totalTransactions = totalTransactions;

    $scope.resetTransactions = function() {
      $scope.totalTransactions = 0;
      total = 0;
      transactions = [];
      console.log(total);
      $scope.transactions = [];

    }
}])
