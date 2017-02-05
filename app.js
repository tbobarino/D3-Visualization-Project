var countryData

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


d3.csv('./data.csv', function(data) {
    countryData = data;
    var height = 800;
    var width = 1150;
    var padding = 30;
    var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);


    var xMax = d3.max(countryData, d => d.country);
    var yMax = d3.max(countryData, d => d.incarceration);
    var xMin = d3.min(countryData, d => d.country);
    var yMin = d3.min(countryData, d => d.incarceration);

    var xScale = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([padding, width - padding])

    var yScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height - padding, padding])

    var colorScale = d3.scaleLinear()
        .domain([100, 500])
        .range(['#8db5f4', '#f20030'])


    svg.selectAll('rect')
        .data(countryData)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 5)
        .attr('y', d => (height - d.incarceration))
        .attr('width', 3)
        .attr('height', d => d.incarceration)
        .attr('fill', d => colorScale(d.incarceration))
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("<b>"+d.country +"</b>"+ "<br/>" + "Rate: " + d.incarceration)
                .style("left", (d3.event.pageX-42) + "px")
                .style("top", (height - d.incarceration) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });



});
