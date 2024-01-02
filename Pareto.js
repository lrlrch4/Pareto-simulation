const svgWidth = 600;
const svgHeight = 600;

const svg = d3.select("#mySvg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    svg.append('rect')
    .attr('width',svgWidth).attr('height', svgHeight).attr('stroke','white').attr('fill', '#242424')

// Configuración de los círculos
const numCircles = 10;

const circleRadius = 200;
const centerX = svgWidth / 2;
const centerY = svgHeight / 2;
const circleData = Array.from({ length: numCircles });


var moneyDistribution = Array.from({length: numCircles}, (_, i) => 10)

// Crear círculos en una circunferencia
const circles = svg.selectAll("circle")
    .data(circleData)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => centerX + circleRadius * Math.cos((-2 * Math.PI * i) / numCircles))
    .attr("cy", (d, i) => centerY + circleRadius * Math.sin((-2 * Math.PI * i) / numCircles))
    .attr("r", 10)
    .attr("id", (d, i) => 'c'+ i.toString()) // Identificador único para cada círculo
    .style("fill", "#0084ff"); // Color de relleno del círculo

const texts = svg.selectAll("text")
    .data(circleData)
    .enter()
    .append("text")
    .attr("x", (d, i) => centerX + 1.2*circleRadius * Math.cos((-2 * Math.PI * i) / numCircles))
    .attr("y", (d, i) => centerY + 1.2*circleRadius * Math.sin((-2 * Math.PI * i) / numCircles))
    .text((d, i) => `(c${i}, ${moneyDistribution[i]})`) // Texto que acompaña a cada círculo
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white")
    .attr("id", (d, i) => 't'+ i.toString());

var iterations = 0;

const iterationsText = svg.append('text').text(`iterations: ${iterations}`).attr('x',15).attr('y',20).attr('fill', 'white').attr('id', 'iterations');

const svg2 = d3.select("#mySvg2")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    svg2.append('rect')
    .attr('width',svgWidth).attr('height', svgHeight).attr('stroke','white').attr('fill', '#242424')


const titleText = svg2.append('text').text(`Distribution char`).attr('x',15).attr('y',20).attr('fill', 'white').attr('id', 'iterations');


const barScale = 5;
const bars = svg2.selectAll('#bars')
    .data(circleData)
    .enter()
    .append('line')
    .attr('id', 'bars')
    .attr('x1', svgWidth/2)
    .attr('y1', (d,i) => 50*(i+1))
    .attr('x2', (d,i) => svgWidth/2 + barScale*moneyDistribution[i])
    .attr('y2', (d,i) => 50*(i+1))    
    .attr('stroke', '#0084ff')
    .attr('stroke-width', 10); 


const barsLabel = svg2.selectAll('#barslabel')
    .data(circleData)
    .enter()
    .append('text')
    .attr('id', 'barslabel')
    .text((d,i) => `c${i}`)    
    .attr('x', svgHeight/2)
    .attr('y', (d, i) => 50*(i+0.8))
    .attr('fill', 'white');

const line = svg2.append('line')
    .attr('stroke', 'white')
    .attr('x1', svgWidth/2)
    .attr('y1', 0)
    .attr('x2', svgWidth/2)
    .attr('y2', svgHeight)
    .attr('opacity', .5)
    .attr('stroke-dasharray', '5,5');


function ConnectAll() {
    const pairs = createPairsList();  

    for(let i = 0; i < numCircles/2; i++){
        Connect(pairs[i][0], pairs[i][1])
    } 

    function createPairsList() {
        var numbers =  Array.from({length: numCircles}, (_, i) => i);
        var pairsList = [];
    
        while (numbers.length > 0) {
        var randomIndex = Math.floor(Math.random() * numbers.length);
        var number1 = numbers.splice(randomIndex, 1)[0];
    
        randomIndex = Math.floor(Math.random() * numbers.length);
        var number2 = numbers.splice(randomIndex, 1)[0];
    
        var pair = [number1, number2];
        pairsList.push(pair);
        }
    
        return pairsList;
    }   
    
    function Connect(a,b){
        // Obtener las posiciones de los círculos
        const circlea = d3.select(`#c${a}`);
        const circleb = d3.select(`#c${b}`);

        const xa = parseFloat(circlea.attr("cx"));
        const ya = parseFloat(circlea.attr("cy"));
        const xb = parseFloat(circleb.attr("cx"));
        const yb = parseFloat(circleb.attr("cy"));

        // Crear una línea entre los dos círculos
        svg.append("line")            
            .attr("x1", xa)
            .attr("y1", ya)
            .attr("x2", xb)
            .attr("y2", yb)
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .attr("opacity", .5);

        const r =  (Math.random() < 0.5) ? -1 : 1;
        
        moneyDistribution[a] +=  r;
        moneyDistribution[b] -=  r;

        svg.select(`#t${a}`).text(`(c${a}, ${moneyDistribution[a]})`)   
        svg.select(`#t${b}`).text(`(c${b}, ${moneyDistribution[b]})`)     
    }  

    console.log(moneyDistribution) 
    bars.attr('x2', (d,i) => svgWidth/2 + barScale*moneyDistribution[i])
}

function Button() {
    svg.selectAll('line').remove();
    ConnectAll()
    iterations += 1;
    iterationsText.text(`iterations: ${iterations}`)
}







