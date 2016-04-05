var bitcoinApp = angular.module('bitcoinApp', [
  'ngWebSocket',
]);

bitcoinApp.controller('TransactionData', ['$scope', '$websocket', 
  function($scope, $websocket) {
    var StreamTransactions = $websocket('wss://bitcoin.toshi.io');
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

    $scope.resetTransactions = function() {
      $scope.totalTransactions = 0;
      total = 0;
      transactions = [];
      $scope.transactions = [];

    }
}]);
