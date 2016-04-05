var bitcoinApp = angular.module('bitcoinApp', [
  'ngWebSocket',
]);

bitcoinApp.controller('TransactionData', ['$scope', '$websocket', '$interval', 'exchangeRates', 'makeRain', 
  function($scope, $websocket, $interval, exchangeRates, makeRain) {
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

    //Timer
    var time = 0;
    var timer = function() {
      $interval(function() {
        $scope.totalTime = time++;
      }, 1000);
    };

    timer();

    $scope.getExchangeRate = function(targetCurrency) {
      $scope.exchangeRate = '';
      $scope.exchangeCurrency = 'Loading...';
      exchangeRates().then(
        function(newRate) {
          $scope.exchangeCurrency = targetCurrency;
          $scope.exchangeRate = Math.round(newRate[targetCurrency]* 1000) / 1000;
        });
    };

    $scope.resetTransactions = function() {
      $scope.totalTransactions = 0;
      total = 0;
      transactions = [];
      time = 0;
      $scope.transactions = [];

    }
}]);


