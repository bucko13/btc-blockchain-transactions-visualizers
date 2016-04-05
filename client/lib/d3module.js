
bitcoinApp.directive('linearChart', function($window, $parse) {
  return{
    restrict: 'EA',
    w: 650,
    h: 250,// total area is 17,000
    template: '<svg width="650" height="250"></svg>',
    link: function(scope, elem, attrs){
      //variable to store the attr we want to watch
      var watch = attrs.chartData;
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
          .attr('width', 140)
          .attr('y',0);

      //need to watch if there are changes to data
      scope.$watch(watch, function(newVal, oldVal) {
        fillVolume = newVal; // the fill volume of tub will be the total transaction volume
        fillContainer();
        console.log(newVal);
      });

      var fillContainer = function() {
        svg.selectAll('rect')
              .data([fillVolume])
                
                .attr('height', fillVolume/w)
                .attr('width', w)
                .attr('x', 0)
                .attr('y', 0)
                .attr('fill', '#f30')
                .transition()
                  .duration(1000);          
      }
      // fillContainer();
    }
  };
});