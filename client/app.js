var bitcoinApp = angular.module('bitcoinApp', [
  'ngWebSocket',
  'ngAnimate'
]);

bitcoinApp.controller('TransactionData', ['$scope', '$websocket', '$interval',  '$window', '$filter', 'exchangeRates', 'makeRain',
  function($scope, $websocket, $interval, $window, $filter, exchangeRates, makeRain) {
    var StreamTransactions = $websocket('wss://ws.blockchain.info/inv');
    var d3 = $window.d3;
    var svg = d3.select('svg');

    //defaults
    var exchangeRate = $scope.exchangeRate = 1;
    var total = displayTransactionTotal = $scope.displayTransactionTotal = 0;
    var transactions = [];
    var symbol = '฿';

    $scope.hideRainAlert = true;
    $scope.hideExchange = true;
    $scope.displaySymbol = '฿';

    //websocket interaction
    StreamTransactions.send(JSON.stringify({"op":"unconfirmed_sub"}));

    StreamTransactions.onMessage(function(message) {
      // set amount to the amount data we get on receiving the request
      // var amount = JSON.parse(message.data).data.amount;
      var amount = JSON.parse(message.data).x.out;

      var count = 0; 
      amount.forEach((output) => {
            // const value = new bn(output.value);
            count += output.value;
          });
      amount = count;
      //format the number to display in Bitcoin
      amount = parseFloat(amount > 0 ? (amount / 1e8).toFixed(8) : 0);
      
      //update the amount
      total = total + parseFloat(amount);
      transactions.push(amount);
      displayTransactionTotal = total * exchangeRate;

      $scope.displayTransactionTotal = $filter('currency')(displayTransactionTotal, symbol, 4);
      $scope.totalTransactions = total;
      $scope.transactions = transactions;
    });


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
              symbol ='฿';
              break;
            case 'USD': 
              symbol ='$';
              break;
            case 'CNY':
              symbol ='¥';
              break;
            default:
              symbol = ''
          }

          $scope.exchangeCurrency = targetCurrency;
          $scope.exchangeRate = exchangeRate = Math.round(newRate[targetCurrency]* 1000) / 1000;
          displayTransactionTotal = $scope.exchangeRate * total;
          $scope.displayTransactionTotal = $filter('currency')(displayTransactionTotal, symbol);(displayTransactionTotal, symbol);
        });
    };

    $scope.makeItRain = function() {
      // console.log($scope.hideRainAlert);
      $scope.hideRainAlert = !$scope.hideRainAlert;
      console.log($scope.hideRainAlert);
    }

    $scope.resetTransactions = function() {
      $scope.hideRainAlert = false;

      $interval(function() {
        $scope.hideRainAlert = true;
      }, 2000, 1);

      $scope.totalTransactions = 0;
      total = 0;
      $scope.transactions = [];
      transactions = [];
      time = 0;
    }

    //Timer
    var time = 0;
    var timer = function() {
      $interval(function() {
        $scope.totalTime = time++;
      }, 1000);
    };

    timer();
}]);


