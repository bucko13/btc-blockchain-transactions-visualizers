
bitcoinApp.directive('fillTub', function($window, $parse) {
  return{
    restrict: 'EA',
    template: '<svg width="650" height="250"></svg>',
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

      svg.selectAll('rect')
        .data([fillVolume]).enter()
          .append('rect')
          .attr('height', fillVolume)
          .attr('width', w)
          .attr('fill', 'steelblue')
          .attr('y', h - fillVolume/w); //need to do the height and y this way because of svg origin in top left

      //need to watch if there are changes to data
      scope.$watch(total, function(newVal, oldVal) {
        fillVolume = parseFloat(newVal); // the fill volume of tub will be the total transaction volume
        fillContainer();
        // newRain();
        // console.log(scope.transactions);
      });

      scope.$watch(transactions, function(newVal, oldVal) {
      });

      var fillContainer = function() {
        svg.selectAll('rect')
              .data([fillVolume])
                .attr('height', fillVolume/w)
                .attr('width', w)
                .attr('y', h - fillVolume/w)
                .attr('fill', 'steelblue')
                .transition()
                  .duration(500);   

        if( scope.transactions) {
          var circle = svg.selectAll("circle")
              .data(scope.transactions)
              .attr('fill', 'steelblue'); 
              newRain();            
        }        
      }
      
      var newRain = function() {
        var rainDrops = svg.selectAll("circle")
                          .data(scope.transactions)
                            .enter().append("circle")
                            .attr('r', function(d) { return Math.sqrt(d); })
                            .attr('cx', function() { return Math.random() * w; })
                            .attr('cy', 0)
                            .attr('fill', 'steelblue')
                            .transition()
                              .duration(2000)
                              .ease('cubic')
                              .attr('cy', function(d) {
                                return h + Math.sqrt(d);
                              });
        return rainDrops;
      }
    }
  };
});