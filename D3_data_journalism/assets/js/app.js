// @TODO: YOUR CODE HERE!

// Set up the plot box.
const svgWidth = 960;
const svgHeight = 500;

const margin = {
top: 20,
right:40,
bottom: 80,
left: 100

};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Creat an SVG wrapper and append and SVG group to hold the chart.
// Then shift by left and top margins.
const svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// // Load journalism data from data.csv
// d3.csv("./data.csv",d3.autoType).then(journal_Data => {

//     console.log(journal_Data);
  
//     console.log(journal_Data.columns)
//     console.log(journal_Data.length)
  
//     // log a list of names
//     const names = journal_Data.map(data => data.name);
//     console.log("names", names);
  
//     // Cast each hours value in tvData as a number using the unary + operator
//     journal_Data.forEach(data => {
//       // data.hours = +data.hours;
//       console.log("Name:", data.name);
// ;
//     });
  
//   }).catch(error => console.log(error));