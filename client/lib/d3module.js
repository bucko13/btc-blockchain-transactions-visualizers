// angular.module('d3', [])
//   .factory('d3Service', [function(){
//     var d3;
//     // insert d3 code here
//     return d3;
// }]);

bitcoinApp.directive('linearChart', function($window) {
    return{
      restrict: 'EA',
      template: '<svg width="850" height="200"></svg>',
      link: function(scope, elem, attrs){
        var exp = $parse(attrs.chartData);
        var d3 = $window.d3;
        var rawSvg=elem.find('svg');
        var svg = d3.select(rawSvg[0]);
    }
  };
});