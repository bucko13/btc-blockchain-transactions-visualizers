
bitcoinApp.directive('fillTub', ['$window', 'makeRain', function($window, makeRain) {
  return{
    restrict: 'EA',
    template: '<svg width="600" height="300" viewBox="0 0 600 300"></svg>',
    link: function(scope, elem, attrs){
      //variable to store the attr we want to watch
      var total = attrs.chartTotal;
      var transactions = attrs.chartTransactions;
      //create our d3 elements
      var d3 = $window.d3;
      var rawSvg=elem.find('svg');
      var svg = d3.select(rawSvg[0]);
    
      //get width and height of svg
      var w = svg.attr('width'); 
      var h = svg.attr('height');
      var full = 17000; //value of target total volume for tub
      var fillVolume = 10; //volume of tub filled

      //need to watch if there are changes to data
      makeRain.generateRain(svg, scope.transactions, 10);
      scope.$watchCollection(total, function(newVal, oldVal) {
        if(oldVal > newVal) {
          fillVolume = 0;
          makeRain.generateRain(svg, scope.transactions, fillVolume);
        }
        else {
          fillVolume = parseFloat(newVal); // the fill volume of tub will be the total transaction volume
          makeRain.newRain(svg, scope.transactions, fillVolume);            
        }
      });
      
    }
  };
}]);