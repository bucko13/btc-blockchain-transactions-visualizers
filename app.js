angular.module('bitcoinApp', [
  'ngWebSocket'
])

.factory('StreamTransactions', function($websocket) {
  // Open a WebSocket connection 
  var dataStream = $websocket('wss://bitcoin.toshi.io');

  var collection = [];
  var transaction;

  dataStream.onMessage(function(message) {
    var amount = JSON.parse(message.data).data.amount
    amount = amount > 0 ? (amount / 1e8).toFixed(8) : false;
    collection.push(amount);
    // transaction = JSON.parse(message.data).data.amount;
    // return transaction;
    // console.log(transaction);
  });

  var methods = {
    collection: collection,
    get: function() {
      dataStream.send(JSON.stringify({ subscribe: 'transactions' }));
    }
  };
  return methods;
})

.controller('TransactionData', ['$scope', 'StreamTransactions', 
  function($scope, StreamTransactions) {
    StreamTransactions.get()
    // var transactions = StreamTransactions.collection;
    $scope.transactions = StreamTransactions.collection;
    console.log(StreamTransactions.collection);
}])