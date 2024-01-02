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
            .attr("stroke-width", 2)
            .attr("opacity", .5);

        const r =  (Math.random() < 0.5) ? -1 : 1;
        
        moneyDistribution[a] +=  r;
        moneyDistribution[b] -=  r;

        svg.select(`#t${a}`).text(`(c${a}, ${moneyDistribution[a]})`)   
        svg.select(`#t${b}`).text(`(c${b}, ${moneyDistribution[b]})`)     
    }  

    console.log(moneyDistribution) 
    bars.attr('x2', (d,i) => moneyAxis(moneyDistribution[i]) )
}

function Button() {
    svg.selectAll('line').remove();

    ConnectAll();

    iterations += 1;

    iterationsText.text(`iterations: ${iterations}`);
}
