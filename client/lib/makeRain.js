bitcoinApp.service('makeRain', function() {
  var newRain = function(svg, transactions, fillVolume) {
    var w = svg.attr('width'); 
    var h = svg.attr('height');

    svg.selectAll("circle")
      .data(transactions)
        .enter().append("circle")
        .attr('r', function(d) { return Math.sqrt(d*2); })
        .attr('cx', function() { return Math.random() * w; })
        .attr('cy', 0)
        .attr('fill', 'steelblue')
        .transition()
          .duration(5000)
          .ease('cubic')
          .attr('cy', function(d) {
            return h + Math.sqrt(d);
          })
          .each('end', function() {
            svg.selectAll('rect')
                  .data([fillVolume])
                    .attr('height', function() { return fillVolume/w; })
                    .attr('width', w)
                    .attr('y', function() {return h - fillVolume/w; })
                    .attr('fill', 'steelblue')
                    .transition()
                      .duration(500);   
              var circle = svg.selectAll("circle")
                  .data(transactions)
                  .attr('fill', 'steelblue'); 
          });      
  }

  return newRain;
});