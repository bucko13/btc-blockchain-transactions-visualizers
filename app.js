angular.module('bitcoinApp', [
  'ngWebSocket'
])

.factory('StreamTransactions', function($websocket) {
  // Open a WebSocket connection 
  var dataStream = $websocket('wss://bitcoin.toshi.io');

  var collection = [];

  dataStream.onMessage(function(message) {
    collection.push(JSON.parse(message.data));
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
    // StreamTransactions.get()
    $scope.transactions = StreamTransactions.collection;
    // console.log(StreamTransactions.get())
}])