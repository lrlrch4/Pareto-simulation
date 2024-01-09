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
    .range([.02*svgWidth, svgWidth*.98]);


const dotsAxis = d3.scaleLinear()
    .domain([0, numCircles - 1])
    .range([.05*svgHeight, .93*svgHeight])
    
    
const titleText = svg2.append('text')
    .text(`Money distribution char`)
    .attr('x', 15)
    .attr('y', 20)
    .attr('fill', 'white')
    .attr('id', 'iterations');


const bars = svg2.selectAll('#bars')
    .data(circleData)
    .enter()
    .append('line')
    .attr('id', 'bars')
    .attr('x1', svgWidth/2)
    .attr('y1', (d,i) => dotsAxis(i))
    .attr('x2', (d,i) => moneyAxis(moneyDistribution[i]))
    .attr('y2', (d,i) => dotsAxis(i))    
    .attr('stroke', '#0084ff')
    .attr('stroke-width', .75*(dotsAxis(1) - dotsAxis(0))  ); 


const originLine = svg2.append('line')
    .attr('stroke', 'white')
    .attr('x1', svgWidth/2)
    .attr('y1', 0)
    .attr('x2', svgWidth/2)
    .attr('y2', svgHeight)
    .attr('opacity', .25)
    .attr('stroke-dasharray', '5,5');

svg2.append("g")
    .attr("transform", `translate(${0},${0.95*svgHeight} )`)
    .call(d3.axisBottom(moneyAxis).ticks(20))
    .attr('color', 'white');

svg2.append("g")
    .attr("transform", `translate(${svgWidth/2},${0} )`)
    .call(
        d3.axisLeft(dotsAxis)
            .ticks(numCircles)
            .tickFormat( 
                (d,i) => {return `c${i}`}
            )
        )
    .attr('color', 'white')
    .attr('font-size', '5px');


