var bitcoinApp = angular.module('bitcoinApp', [
  'ngWebSocket',
]);

bitcoinApp.controller('TransactionData', ['$scope', '$websocket', '$interval',  '$window', 'exchangeRates', 'makeRain',
  function($scope, $websocket, $interval, $window, exchangeRates, makeRain) {
    var StreamTransactions = $websocket('wss://bitcoin.toshi.io');
    var d3 = $window.d3;
    var svg = d3.select('svg');

    //defaults
    var exchangeRate = $scope.exchangeRate = 1;
    var total = displayTransactionTotal = 0;
    var transactions = [];

    $scope.hideExchange = true;
    $scope.displaySymbol = '฿'

    //websocket interaction
    StreamTransactions.onMessage(function(message) {
      //set amount to the amount data we get on receiving the request
      var amount = JSON.parse(message.data).data.amount;
      //format the number to display in Bitcoin
      amount = parseFloat(amount > 0 ? (amount / 1e8).toFixed(8) : 0);
      
      //update the amount
      total = total + parseFloat(amount);
      transactions.push(amount);
      displayTransactionTotal = total * exchangeRate;

      $scope.displayTransactionTotal = displayTransactionTotal;
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
      //set loading displays
      $scope.exchangeRate = '';
      $scope.exchangeCurrency = 'Loading...';

      if (targetCurrency === 'BTC') {
        $scope.hideExchange = true;
      } else {
        $scope.hideExchange = false;
      }

      exchangeRates().then(
        function(newRate) {
          switch(targetCurrency) {
            case 'BTC': 
              $scope.displaySymbol = '฿';
              break;
            case 'USD': 
              $scope.displaySymbol = '$';
              break;
            case 'CNY':
              $scope.displaySymbol = '¥';
              break;
            default:
              $scope.displaySymbol = ''
          }

          $scope.exchangeCurrency = targetCurrency;
          $scope.exchangeRate = exchangeRate = Math.round(newRate[targetCurrency]* 1000) / 1000;
          $scope.displayTransactionTotal = $scope.exchangeRate * total;
        });
    };

    $scope.resetTransactions = function() {
      // $scope.makeItRain = false;
      $scope.totalTransactions = 0;
      total = 0;
      $scope.transactions = [];
      transactions = [];
      time = 0;
    }
}]);


