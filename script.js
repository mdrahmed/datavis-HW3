// Constants for the charts, that would be useful.
const CHART_WIDTH = 500;
const CHART_HEIGHT = 250;
const MARGIN = { left: 50, bottom: 20, top: 20, right: 20 };
const ANIMATION_DUATION = 300;

setup();

function setup () {

  // Fill in some d3 setting up here if you need
  // for example, svg for each chart, g for axis and shapes
  
// sample data loading
  //d3.csv("/data/covid_ca.csv",function(data) {
  //      	console.log(data);
  //      
  //      }
  //);

  changeData();
}

/**
 * Render the visualizations
 * @param data
 */
function update (data) {

  // ****** TODO ******
  console.log(data);
  //Experimenting on bar chart
	updateBarChart(data);

  // Syntax for line generator.
  // when updating the path for line chart, use the function as the input for 'd' attribute.
  // https://github.com/d3/d3-shape/blob/main/README.md


  // const lineGenerator = d3.line()
  //   .x(d => the x coordinate for a point of the line)
  //   .y(d => the y coordinate for a point of the line);
	//updateLineChart(data);
	let svg = d3.select("#Linechart-div")
                         .append("svg")
                         //.attr("width",600)
                         //.attr("height",275)
                         //.attr("padding",10);
                         .attr("width", CHART_WIDTH + MARGIN.left + MARGIN.right)
                         .attr("height", CHART_HEIGHT + MARGIN.top + MARGIN.bottom);

	console.log(svg.style("height"),svg.style("width"));
        let g = svg.append("g")
                        .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

	d3.map(data,d => console.log("linear: ",d.date));	
	let xScale = d3.scaleLinear()
			//.domain([0,d3.map(data,function(d) {console.log(d.deaths); return d.date;})])
			//.domain([0, d3.extent(data, d => d.date) ])
			.domain([0,d3.map(data, d => d.date)])
			.range([0,CHART_WIDTH]);
	
	let yScale = d3.scaleLinear()	
			.domain([0,d3.max(data,d => d.deaths)])
			.range([CHART_HEIGHT, 0]);


	g.append("g")
                //.attr("class", "axis axis--x")
                .attr("transform", "translate(0," + CHART_HEIGHT + ")")
                .call(d3.axisBottom(xScale));
        g.append("g")
                //.attr("class", "axis axis--y")
                .call(d3.axisLeft(yScale));



  // Syntax for area generator.
  // the area is bounded by upper and lower lines. So you can specify x0, x1, y0, y1 seperately. Here, since the area chart will have upper and lower sharing the x coordinates, we can just use x(). 
  // Similarly, use the function as the input for 'd' attribute. 

  // const areaGenerator = d3.area()
  //   .x(d => the x coordinates for upper and lower lines, both x0 and x1)
  //   .y1(d => the y coordinate for the upper line)
  //   .y0(d=> the base line y coordinate for the area);


  //Set up scatter plot x and y axis. 
  //Since we are mapping death and case, we need new scales instead of the ones above. 
  //Cases would be the horizontal axis, so we need to use width related constants.
  //Deaths would be vertical axis, so that would need to use height related constants.


  //TODO 
  // call each update function below, adjust the input for the functions if you need to.
}

/**
 * Update the bar chart
 */

function updateBarChart (data) {
 	let svg = d3.select("#Barchart-div")
        		.append("svg")
			//.attr("width",600)
			//.attr("height",275)
			//.attr("padding",10);
			.attr("width", CHART_WIDTH + MARGIN.left + MARGIN.right)
    			.attr("height", CHART_HEIGHT + MARGIN.top + MARGIN.bottom);
    	console.log(svg.style("height"),svg.style("width"));	
	let g = svg.append("g")
    			.attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");		
	
	let xScale = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1),
    		yScale = d3.scaleLinear().rangeRound([CHART_HEIGHT, 0]);	
	
	
	xScale.domain(data.map(function(d) {console.log(d.deaths); return d.date;}));
	//let yValue = 0;
	let y = d3.select("#metric").node().value;
	console.log("y: ",y,"max: ",d3.max(data,function(d) { return d[y]}));
	yScale.domain([0,d3.max(data,function(d) {return d.deaths;})]);
	//yScale.domain([0,d3.max(data,function(d) {
	//	//console.log(yValue); 
	//	//yValue+=20; 
	//	//if(yValue > 180)
	//	//	return;
	//	return yValue;
	//}  )]);
	
	g.append("g")
		//.attr("class", "axis axis--x")
      		.attr("transform", "translate(0," + CHART_HEIGHT + ")")
      		.call(d3.axisBottom(xScale));
	g.append("g")
      		//.attr("class", "axis axis--y")
     		.call(d3.axisLeft(yScale));

	
	g.selectAll(".bar-chart")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.date); })
         .attr("y", function(d) { return yScale(d.deaths); })
         .attr("width", xScale.bandwidth())
	 .attr("height", function(d) {return CHART_HEIGHT - yScale(d.deaths)} );


}	

/**
 * Update the line chart
 */
function updateLineChart (data) {
	let svg = d3.select("#Linechart-div")
                         .append("svg")
                         //.attr("width",600)
                         //.attr("height",275)
                         //.attr("padding",10);
                         .attr("width", CHART_WIDTH + MARGIN.left + MARGIN.right)
                         .attr("height", CHART_HEIGHT + MARGIN.top + MARGIN.bottom);
        console.log("linear chart ",svg.style("height"),svg.style("width"));

	let g = svg.append("g")
                        .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

        let xScale = d3.scaleLinear().rangeRound([0, CHART_WIDTH]).padding(0.1),
                yScale = d3.scaleLinear().rangeRound([CHART_HEIGHT, 0]);



	xScale.domain(data.map(function(d) {console.log(d.deaths); return d.date;})).range([0,CHART_WIDTH]);
        let y = d3.select("#metric").property("value");
        console.log("y: ",y,"max: ",d3.max(data,function(d) {return d.y}));
        yScale.domain([0,d3.max(data,function(d) {return d.deaths;})]).range([CHART_HEIGHT,0]);

	g.append("g")
                //.attr("class", "axis axis--x")
                .attr("transform", "translate(0," + CHART_HEIGHT + ")")
                .call(d3.axisBottom(xScale));
        g.append("g")
                //.attr("class", "axis axis--y")
                .call(d3.axisLeft(yScale));
	console.log("line");

	let line = svg.append('g')
      			.append("path")
        		.data(data)
			.attr("class", "line-chart")
        		.attr("d", d3.line()
          			.x(function(d) { return xScale(d.date); })
          			.y(function(d) { return yScale(d.deaths); })
        		);
			

	//let line = d3.line()
    	//	.x(d3.map(data,(function(d) { console.log("date ",d.date); return xScale(d.date); })))
    	//	.y(d3.map(data,(function(d) { console.log("deaths ",d.deaths); return yScale(d.deaths); })));

	//g.append("path")
      	//	.data(data)
	//	.attr("class", "line")  
    	//	.attr("d", line);
	//	//.attr("d",d3.line()
	//	//	.x()
	//	//)
}

/**
 * Update the area chart 
 */
function updateAreaChart () {

}

/**
 * update the scatter plot.
 */

function updateScatterPlot () {

}


/**
 * Update the data according to document settings
 */
function changeData () {
  //  Load the file indicated by the select menu
  const dataFile = d3.select('#dataset').property('value');
  console.log("dataFile ",dataFile);
  d3.csv(`data/${dataFile}.csv`)
    .then(dataOutput => {

      /**
       * D3 loads all CSV data as strings. While Javascript is pretty smart
       * about interpreting strings as numbers when you do things like
       * multiplication, it will still treat them as strings where it makes
       * sense (e.g. adding strings will concatenate them, not add the values
       * together, or comparing strings will do string comparison, not numeric
       * comparison).
       *
       * We need to explicitly convert values to numbers so that comparisons work
       * when we call d3.max()
       **/

      const dataResult = dataOutput.map((d) => ({
        cases: parseInt(d.cases),
        deaths: parseInt(d.deaths),
        date: d3.timeFormat("%m/%d")(d3.timeParse("%d-%b")(d.date))
      }));
      if (document.getElementById('random').checked) {
        // if random subset is selected
        update(randomSubset(dataResult));
      } else {
        update(dataResult);
      }
    }).catch(e => {
      console.log(e);
      alert('Error!');
    });
}

/**
 *  Slice out a random chunk of the provided in data
 *  @param data
 */
function randomSubset (data) {
  return data.filter((d) => Math.random() > 0.5);
}
