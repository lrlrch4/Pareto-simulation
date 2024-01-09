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

    //Connect two dots to represent de exchange
    function Connect(a,b){
        // Obtener las posiciones de los círculos
        const circlea = d3.select(`#c${a}`);
        const circleb = d3.select(`#c${b}`);

        const xa = parseFloat(circlea.attr("cx"));
        const ya = parseFloat(circlea.attr("cy"));
        const xb = parseFloat(circleb.attr("cx"));
        const yb = parseFloat(circleb.attr("cy"));

        // Create the line
        svg.append("line")            
            .attr("x1", xa)
            .attr("y1", ya)
            .attr("x2", xb)
            .attr("y2", yb)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr("opacity", .5);

        var r =  (Math.random() < 0.5) ? -1 : 1;

        if(moneyDistribution[a] == 0 || moneyDistribution[b] == 0){
            r = 0;
        }       

        moneyDistribution[a] +=  r;
        moneyDistribution[b] -=  r;

        moneyText.select(`#money${a}`).text(`${moneyDistribution[a]} $`)
        moneyText.select(`#money${b}`).text(`${moneyDistribution[b]} $`)
        
        if(r == 1){
            svg.select(`#c${a}`).style('fill', '#0e5c00');
            svg.select(`#c${b}`).style('fill', '#8a0000');
        }
        if(r == -1){
            svg.select(`#c${a}`).style('fill', '#8a0000');
            svg.select(`#c${b}`).style('fill', '#0e5c00');
        }
        if(r == 0){
            svg.select(`#c${a}`).style('fill', '#0af');
            svg.select(`#c${b}`).style('fill', '#0af');
        }
    }  

    console.log(moneyDistribution) 
    bars.attr('x2', (d,i) => moneyAxis(moneyDistribution[i]) )
}

function Button() {
    svg.selectAll('line').remove();
    svg2.selectAll('#sortedBars').remove();

    ConnectAll();

    iterations += 1;

    iterationsText.text(`iterations: ${iterations}`);
}

function sortButton() {
    
    sortedDistribution = [...moneyDistribution]
    sortedDistribution.sort(function(a,b) {return b-a;});
    console.log('sorted', sortedDistribution);


    svg2.selectAll('#sortedBars')
    .data(circleData)
    .enter()
    .append('line')
    .attr('id', 'sortedBars')
    .attr('x1', svgWidth/2)
    .attr('y1', (d,i) => dotsAxis(i))
    .attr('x2', (d,i) => moneyAxis(sortedDistribution[i]))
    .attr('y2', (d,i) => dotsAxis(i))    
    .attr('stroke', 'red')
    .attr('opacity', .5)
    .attr('stroke-width', .75*(dotsAxis(1) - dotsAxis(0))  ); 

}