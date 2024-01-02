const svg2 = d3.select("#mySvg2")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

svg2.append('rect')
    .attr('width',svgWidth)
    .attr('height', svgHeight)
    .attr('stroke','white')
    .attr('fill', '#242424')

const moneyAxis = d3.scaleLinear()
    .domain([-100, 100])
    .range([15, svgWidth-15]);

svg2.append("g")
    .attr("transform", `translate(${0},${0.9*svgHeight} )`)
    .call(d3.axisBottom(moneyAxis).ticks(20))
    .attr('color', 'white');



const titleText = svg2.append('text')
                    .text(`Money distribution char`)
                    .attr('x',15)
                    .attr('y',20)
                    .attr('fill', 'white')
                    .attr('id', 'iterations');


const barScale = 5;

const bars = svg2.selectAll('#bars')
    .data(circleData)
    .enter()
    .append('line')
    .attr('id', 'bars')
    .attr('x1', svgWidth/2)
    .attr('y1', (d,i) => 50*(i+1))
    .attr('x2', (d,i) => moneyAxis(moneyDistribution[i]))
    .attr('y2', (d,i) => 50*(i+1))    
    .attr('stroke', '#0084ff')
    .attr('stroke-width', 20); 


const barsLabel = svg2.selectAll('#barslabel')
    .data(circleData)
    .enter()
    .append('text')
    .attr('id', 'barslabel')
    .text((d,i) => `c${i}`)    
    .attr('x', svgHeight/2)
    .attr('y', (d, i) => 50*(i+0.7))
    .attr('fill', 'white');

const originLine = svg2.append('line')
    .attr('stroke', 'white')
    .attr('x1', svgWidth/2)
    .attr('y1', 0)
    .attr('x2', svgWidth/2)
    .attr('y2', svgHeight)
    .attr('opacity', .25)
    .attr('stroke-dasharray', '5,5');

