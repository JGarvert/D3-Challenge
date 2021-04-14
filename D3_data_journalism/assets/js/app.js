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
const svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv").then(avgageData => {

    // Parse Data/Cast as numbers
    // ?Format and convert as needed?
   avgageData.forEach(data => {
      data.age = +data.age;
      data.healthcare = +data.healthcare;
    });

    // Create scales
    const xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(avgageData, d => d.age)])
      .range([0, width]);

    const yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(avgageData, d => d.healthcare)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    const bottomAxis = d3.axisBottom(xLinearScale);
    const leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    const circlesGroup = chartGroup.selectAll("circle")
    .data(avgageData)
    .join("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", 0.5)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

    // Step 6: Initialize tool tip
    // ==============================
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
      .text("Number of Billboard 100 Hits");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Hair Metal Band Hair Length (inches)");
  }).catch(error => console.log(error));


  
