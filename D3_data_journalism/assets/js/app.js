// Set up the chart
// Select SVG dimension and buffer (margin) dimensions
const svgWidth = 960;
const svgHeight = 500;

const margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

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
d3.csv("assets/date/data.csv").then(avgageData => {

    // Parse Data and cast as numbers
    // ?Format and convert as needed?
    // Set lower axis'
   avgageData.forEach(data => {
      data.age = +data.age;
      data.healthcare = +data.healthcare;
    });
// Check data
    console.log(avgageData);

    // Create axis details and define with D3
    const x_Scale = d3.scaleLinear()
      .domain([20, d3.max(avgageData, d => d.age)])
      .range([0, width]);

    const y_Scale = d3.scaleLinear()
      .domain([0, d3.max(avgageData, d => d.healthcare)])
      .range([height, 0]);
 
    // Create the axis
    const bottomAxis = d3.axisBottom(x_Scale);
    const leftAxis = d3.axisLeft(y_Scale);

    // Step 4: Append Axes to the chart
    chartGroup.append("g")
      .classed("x-axis",true)
      .attr("transform", `translate(0, ${height + margin.top -10})`)
      .call(bottomAxis);

    chartGroup.append("g").call(leftAxis);
  
    //  Create Circles
    const circlesGroup = chartGroup.selectAll("circle")
    .data(avgageData)
    .enter()
    .join("circle")
    .attr("cx", d => x_Scale(d.age))
    .attr("cy", d => y_Scale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", 0.6)
    .attr("stroke", "white")
    .attr("stroke-width", .5);

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



  
