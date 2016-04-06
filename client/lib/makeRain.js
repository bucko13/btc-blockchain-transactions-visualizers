bitcoinApp.service('makeRain', function() {
  var fillVolume = 0;
  var newRain = function(svg, transactions, fill) {
    var w = parseFloat(svg.attr('width')); 
    var h = parseFloat(svg.attr('height'));
    fillVolume = fill;

    svg.selectAll("circle")
      .data(transactions)
        .enter().append("circle")
        .attr('r', function(d) { return Math.sqrt(d*2); })
        .attr('cx', function() { return Math.random() * w; })
        .attr('cy', 0)
        .attr('fill', 'steelblue')
        .transition()
          .duration(2000)
          .ease('cubic')
          .attr('cy', function(d) {
            return h + Math.sqrt(d) * 2;
          })
          .each('end', function() {
            svg.selectAll('rect')
                  .data([fillVolume])
                    .attr('height', function() { return (fillVolume/w ) * 2; })
                    .attr('width', w)
                    .attr('y', function() { return h - (fillVolume/w ) * 2; })
                    .attr('fill', 'steelblue')
                    .transition()
                      .duration(500);   
              var circle = svg.selectAll("circle")
                  .data(transactions)
                  .attr('fill', 'steelblue'); 
          });      
  }

  var generateRain = function(svg, transactions) {
    fillVolume = 0;
    var w = svg.attr('width'); 
    var h = svg.attr('height');
    svg.selectAll('rect').remove();
    svg.selectAll('circle').remove();

    svg.selectAll('rect')
      .data([0]).enter()
        .append('rect')
        .attr('height', 10)
        .attr('width', w)
        .attr('fill', 'steelblue')
        .attr('y', function() { return h - 10/w; }); //need to do the height and y this way because of svg origin in top left

    svg.selectAll("circle")
      .data([1])
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
          });  
  }

  return ({
    newRain: newRain,
    generateRain: generateRain
  });
});