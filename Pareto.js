const svgWidth = 600;
const svgHeight = 600;

const svg = d3.select("#mySvg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

svg.append('rect')
    .attr('width',svgWidth)
    .attr('height', svgHeight)
    .attr('stroke','white')
    .attr('fill', '#242424')

// Configuración de los círculos
var numCircles = 50;


const circleRadius = .43*svgWidth;
const centerX = svgWidth / 2;
const centerY = svgHeight / 2;
const circleData = Array.from({ length: numCircles });


var moneyDistribution = Array.from({length: numCircles}, (_, i) => 10)

// Create circles around a circunference
const circles = svg.selectAll("circle")
    .data(circleData)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => centerX + circleRadius * Math.cos((-2 * Math.PI * i) / numCircles))
    .attr("cy", (d, i) => centerY + circleRadius * Math.sin((-2 * Math.PI * i) / numCircles))
    .attr("r", 8)
    .attr("id", (d, i) => 'c'+ i.toString()) 
    .style("fill", "#0084ff"); 
    
//Create its labels
const texts = svg.selectAll("text")
    .data(circleData)
    .enter()
    .append("text")
    .attr("x", (d, i) => centerX + circleRadius * Math.cos((-2 * Math.PI * i) / numCircles))
    .attr("y", (d, i) => centerY + circleRadius * Math.sin((-2 * Math.PI * i) / numCircles))
    .text((d, i) => `c${i}` )
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white")
    .attr("id", (d, i) => 't'+ i.toString())
    .style('font-size', '7px');

moneyText = svg.append('g')

moneyText.selectAll('text')
    .data(circleData)
    .enter()
    .append("text")
    .attr("x", (d, i) => centerX + 1.065*circleRadius * Math.cos((-2 * Math.PI * i) / numCircles))
    .attr("y", (d, i) => centerY + 1.065*circleRadius * Math.sin((-2 * Math.PI * i) / numCircles))
    .text((d, i) => `${moneyDistribution[i]} $` )
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white")
    .attr("id", (d, i) => 'money'+ i.toString())
    .style('font-size', '7px');

var iterations = 0;

const iterationsText = svg.append('text')
    .text(`Iterations: ${iterations}`)
    .attr('x',10)
    .attr('y',20)
    .attr('fill', 'white')
    .attr('id', 'iterations');