
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
     
     //need to create our first, empty rectangle
      // svg.selectAll('rect')
      //   .data([fillVolume]).enter()
      //     .append('rect')
      //     .attr('height', fillVolume)
      //     .attr('width', w)
      //     .attr('fill', 'steelblue')
      //     .attr('y', function() { return h - fillVolume/w; }); //need to do the height and y this way because of svg origin in top left

      // svg.selectAll("circle")
      //   .data([1])
      //     .enter().append("circle")
      //     .attr('r', function(d) { return Math.sqrt(d*2); })
      //     .attr('cx', function() { return Math.random() * w; })
      //     .attr('cy', 0)
      //     .attr('fill', 'steelblue')
      //     .transition()
      //       .duration(5000)
      //       .ease('cubic')
      //       .attr('cy', function(d) {
      //         return h + Math.sqrt(d);
      //       });   

      //need to watch if there are changes to data
      makeRain.generateRain(svg, scope.transactions, 10);
      scope.$watchCollection(total, function(newVal, oldVal) {
        if(oldVal > newVal) {
          console.log('You reset!');
          makeRain.generateRain(svg, scope.transactions, 10);
        }
        fillVolume = parseFloat(newVal); // the fill volume of tub will be the total transaction volume
        makeRain.newRain(svg, scope.transactions, fillVolume);            
      });
      
      // var newRain = function() {
      //   svg.selectAll("circle")
      //     .data(scope.transactions)
      //       .enter().append("circle")
      //       .attr('r', function(d) { return Math.sqrt(d*2); })
      //       .attr('cx', function() { return Math.random() * w; })
      //       .attr('cy', 0)
      //       .attr('fill', 'steelblue')
      //       .transition()
      //         .duration(5000)
      //         .ease('cubic')
      //         .attr('cy', function(d) {
      //           return h + Math.sqrt(d);
      //         })
      //         .each('end', fillContainer);      
      // }

      // var fillContainer = function() {
      //   svg.selectAll('rect')
      //         .data([fillVolume])
      //           .attr('height', function() {return fillVolume/w; })
      //           .attr('width', w)
      //           .attr('y', function() {return h - fillVolume/w; })
      //           .attr('fill', 'steelblue')
      //           .transition()
      //             .duration(500);   
      //     var circle = svg.selectAll("circle")
      //         .data(scope.transactions)
      //         .attr('fill', 'steelblue'); 
      // }
    }
  };
}]);