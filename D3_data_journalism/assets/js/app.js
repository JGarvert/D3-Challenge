// Set up the chart
// Select SVG dimension and buffer (margin) dimensions
const svgWidth = 1000;
const svgHeight = 700;

const margin = {  top: 40,  right: 210,  bottom: 100,  left: 100};
 //Set chart location within div using margins
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart.
// Shift the SVG by left and top margins.
const svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(avgageData => {

    // Parse Data and cast as numbers
   avgageData.forEach(data => {
      data.age = +data.age;
      data.healthcare = +data.healthcare;
    });
// Check data
    console.log(avgageData);

    // Create axis details and define with D3
    const x_Scale = d3.scaleLinear()
      // .domain([20, d3.max(avgageData, d => d.age)])
      .domain(d3.extent(avgageData, data => data.age))
      .range([0, width])
      .nice();

    const y_Scale = d3.scaleLinear()
      // .domain([0, d3.max(avgageData, d => d.healthcare)])
      .domain(d3.extent(avgageData, data => data.healthcare))
      .range([height, 0])
      .nice();

    // const bottom_axis = d3.axisBottom(x_Scale);
    // const left_axis = de.axisLeft(y_Scale);
 
    // Create the axis
    const bottomAxis = d3.axisBottom(x_Scale);
    const leftAxis = d3.axisLeft(y_Scale);

    // Step 4: Append Axes to the chart
    chartGroup.append("g")
      // .classed("x-axis",true)
      // .attr("transform", `translate(0, ${height + margin.top})`)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g").call(leftAxis);
  
    //  Create Circles
    // First add in color scale

    // var colors = d3.scaleQuantize()
    // .domain([30,40])
    // .range(["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4", "#E6F598", 
    // "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142"]);
    // var colorCodes = ["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4", "#E6F598", "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142"];

    // var colors = d3.scaleQuantile()
    //   //quantize scale divides domain in bands according to ordinal scale range
    //   .domain(d3.extent(avgageData, data => data.age))
    //   //.domain(d3.ticks(minTemp,maxTemp,11))
    //   .range(colorCodes);

        // Add the state abbreviations to the circles



    const circlesGroup = chartGroup.selectAll("circle")
    .data(avgageData)
    .join("circle")
    .attr("cx", d => x_Scale(d.age))
    .attr("cy", d => y_Scale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "#B5D3E7")
    .attr("opacity", 0.6)
    .attr("stroke", "white")
    .attr("stroke-width", .5);

    // Add in the state abbreviation
    const circlesAbbv = chartGroup.selectAll("text")
    .data(avgageData)
    .enter().append("text")
    .attr("stroke","black")
    .attr("x", d => x_Scale(d.age)-8)
    .attr("y", d => y_Scale(d.healthcare)+6)
    .attr("font-size",12)
    .text( function (d) { return d.abbr; })

 
    // Initialize tool tip

    const toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(d => `${d.abbr}<br>Average Age: ${d.age}<br>Healthcare: ${d.healthcare}`);

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Average Age");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Average Healthcare");
  }).catch(error => console.log(error));



  
