angular.module('bitcoinApp', [
  'ngWebSocket'
])

.factory('StreamTransactions', function($websocket) {
  // Open a WebSocket connection 
  var dataStream = $websocket('wss://bitcoin.toshi.io');

  var collection = [];
  var total = 0 ;

  dataStream.onMessage(function(message) {
    var amount = JSON.parse(message.data).data.amount
    amount = parseFloat(amount > 0 ? (amount / 1e8).toFixed(8) : false);
    collection.push(amount);
    total = total + amount;
    methods.total = total;

  });

  var methods = {
    collection: collection,
    total: total,
    get: function() {
      dataStream.send(JSON.stringify({ subscribe: 'transactions' }));
    },
  };
  return methods;
})

.controller('TransactionData', ['$scope', 'StreamTransactions', 
  function($scope, StreamTransactions) {
    StreamTransactions.get();
    $scope.totalTransactions = StreamTransactions.total;
    $scope.transactions = StreamTransactions.collection;
    console.log(StreamTransactions);
}])