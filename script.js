// Constants for the charts, that would be useful.
const CHART_WIDTH = 500;
const CHART_HEIGHT = 250;
const MARGIN = { left: 50, bottom: 20, top: 20, right: 20 };
const ANIMATION_DUATION = 300;
let randomData=0;
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


// function remove_graphs(){
// 	this.svg_linear.remove();
// 	this.svg_bar.remove();
// 	this.svg_area.remove();
// 	this.svg_scatter.remove();
// }

/**
 * Render the visualizations
 * @param data
 */
function update (data) {


  // ****** TODO ******
  console.log(data);
  //Experimenting on bar chart
	// updateBarChart(data);

        // test
        // this.test = d3.select("#test")
        //                 .append("svg")
        //                 .attr("width", CHART_WIDTH + MARGIN.left + MARGIN.right)
    	// 		.attr("height", CHART_HEIGHT + MARGIN.top + MARGIN.bottom)
	// 		.attr("id","test") 
        // let test_g = this.test.append("g")
        //                 .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")")        
        // test_g.append("g").attr("class","b")
        //                 .append("rect")
        //                 .attr('x', 10)
        //                 .attr('y', 10)
        //                 .attr('width', 600)
        //                 .attr('height', 40)


        this.svg_bar = d3.select("#Barchart-div")
        		.append("svg")
			//.attr("width",600)
			//.attr("height",275)
			//.attr("padding",10);
			.attr("width", CHART_WIDTH + MARGIN.left + MARGIN.right)
    			.attr("height", CHART_HEIGHT + MARGIN.top + MARGIN.bottom)
			.attr("id","bar-svg")
                .append("g")
    			.attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")")
    	// console.log(this.svg_bar.style("height"),svg_bar.style("width"));	
	// this.gBar = svg_bar.append("g")
    	// 		.attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")")
	// 		.attr("id","bar-g");	
	let xScaleBar = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1),
    		yScaleBar = d3.scaleLinear().rangeRound([CHART_HEIGHT, 0]);	
	
	
	xScaleBar.domain(data.map(function(d) {return d.date;}));
	//let yValue = 0;
	let yAxis = d3.select("#metric").node().value;
	console.log("y: ",yAxis,"max: ",d3.max(data,function(d) { return d[yAxis]}));
	yScaleBar.domain([0,d3.max(data,function(d) {return d[yAxis];})]);
	//yScale.domain([0,d3.max(data,function(d) {
	//	//console.log(yValue); 
	//	//yValue+=20; 
	//	//if(yValue > 180)
	//	//	return;
	//	return yValue;
	//}  )]);
	
	this.svg_bar.append("g")
		.attr("class", "x axis")
      		.attr("transform", "translate(0," + CHART_HEIGHT + ")")
      		.call(d3.axisBottom(xScaleBar));
	this.svg_bar.append("g")
      		.attr("class", "y axis")
     		.call(d3.axisLeft(yScaleBar));

	
	this.bar = this.svg_bar
                .append("g").attr("class","rect_g")
                // .append("g").attr("class","bar-chart")
                .selectAll("rect")
                .data(data)
                .enter()
                .append("g").attr("class","bar-chart")
                .append("rect")
                // .attr("class","bar-chart")
                // .attr("class","rect")
                // .selectAll(".bar-chart.rect")
                .on("mouseover",function() {
                        d3.select(this)
                                .attr("class","hovered")
                })
                .on("mouseout",function(){
                        d3.select(this)
                                .attr("class","bar-chart")
                })
        // this.svg_bar.selectAll("rect")
                .transition()
                .duration(1000)
                .attr("x", function(d) { return xScaleBar(d.date); })
                .attr("y", function(d) { return yScaleBar(d[yAxis]); })
                .attr("width", xScaleBar.bandwidth())
                .attr("height", function(d) {return CHART_HEIGHT - yScaleBar(d[yAxis])} );
        
        // console.log("height bar: ",this.bar.style("height"));

  // Syntax for line generator.
  // when updating the path for line chart, use the function as the input for 'd' attribute.
  // https://github.com/d3/d3-shape/blob/main/README.md


  // const lineGenerator = d3.line()
  //   .x(d => the x coordinate for a point of the line)
  //   .y(d => the y coordinate for a point of the line);
	//updateLineChart(data);
	this.svg_linear = d3.select("#Linechart-div")
                         .append("svg")
                         //.attr("width",600)
                         //.attr("height",275)
                         //.attr("padding",10);
                         .attr("width", CHART_WIDTH + MARGIN.left + MARGIN.right)
                         .attr("height", CHART_HEIGHT + MARGIN.top + MARGIN.bottom)
                .append("g")
                        .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

	// console.log(svg_linear.style("height"),svg_linear.style("width"));
        // let g = svg_linear.append("g")
        //                 .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

	// d3.map(data,d => console.log("linear: ",d.date));	
	let xScale = d3.scalePoint()
			//.domain([0,d3.map(data,function(d) {console.log(d.deaths); return d.date;})])
			//.domain([0, d3.extent(data, d => d.date) ])
			.domain(d3.map(data, d => d.date))
			.range([0,CHART_WIDTH]);
	
	let yScale = d3.scaleLinear()	
			.domain([0,d3.max(data,d => d[yAxis])])
			.range([CHART_HEIGHT, 0]);


        this.svg_linear.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + CHART_HEIGHT + ")")
                .call(d3.axisBottom(xScale));
        this.svg_linear.append("g")
                .attr("class", "y axis")
		//.attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
                .call(d3.axisLeft(yScale));

	this.line = this.svg_linear.append('g')
                        .append("path")
                        .datum(data)
                        .attr("class", "line-chart")
                        .attr("d", d3.line()
                                //.x(data, d => console.log("x val: ", d.date); xScale(+d.date))
				//.y(data, d => console.log("y val: ",d.deaths); yScale(+d.deaths))
				.x(function(d) {return xScale(d.date); })
                                .y(function(d) { return yScale(d[yAxis]); })
                        );


  // Syntax for area generator.
  // the area is bounded by upper and lower lines. So you can specify x0, x1, y0, y1 seperately. Here, since the area chart will have upper and lower sharing the x coordinates, we can just use x(). 
  // Similarly, use the function as the input for 'd' attribute. 

  // const areaGenerator = d3.area()
  //   .x(d => the x coordinates for upper and lower lines, both x0 and x1)
  //   .y1(d => the y coordinate for the upper line)
  //   .y0(d=> the base line y coordinate for the area);
	
	this.svg_area = d3.select("#Areachart-div")
                         .append("svg")
                         //.attr("width",600)
                         //.attr("height",275)
                         //.attr("padding",10);
                         .attr("width", CHART_WIDTH + MARGIN.left + MARGIN.right)
                         .attr("height", CHART_HEIGHT + MARGIN.top + MARGIN.bottom)
                         .append("g")
                        .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

        // console.log(svg_area.style("height"),svg_area.style("width"));
        // let g_area = svg_area.append("g")
        //                 .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

	this.svg_area.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + CHART_HEIGHT + ")")
                .call(d3.axisBottom(xScale));
        this.svg_area.append("g")
                .attr("class", "y axis")
                //.attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
                .call(d3.axisLeft(yScale));
	
	this.area = this.svg_area.append('g')
                        .append("path")
                        .datum(data)
                        .attr("class", "area-chart")
                        .attr("d", d3.area()
                                //.x(data, d => console.log("x val: ", d.date); xScale(+d.date))
                                //.y(data, d => console.log("y val: ",d.deaths); yScale(+d.deaths))
                                .x(function(d) { return xScale(d.date); })
                                .y1(function(d) { return yScale(d[yAxis]); })
				.y0(CHART_HEIGHT)
                        );


  //Set up scatter plot x and y axis. 
  //Since we are mapping death and case, we need new scales instead of the ones above. 
  //Cases would be the horizontal axis, so we need to use width related constants.
  //Deaths would be vertical axis, so that would need to use height related constants.
	
	this.svg_scatter = d3.select("#Scatterplot-div")
                         .append("svg")
                         //.attr("width",600)
                         //.attr("height",275)
                         //.attr("padding",10);
                         .attr("width", CHART_WIDTH + MARGIN.left + MARGIN.right)
                         .attr("height", CHART_HEIGHT + MARGIN.top + MARGIN.bottom)
                .append("g")
                         .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");
        console.log("scatter data: ",data);
	// let g_scatter = svg_scatter.append("g")
        //                 .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");
	
	let xScatter = d3.scaleLinear()
			.domain([0,d3.max(data,d => d.cases)])
			.range([0,CHART_WIDTH]); // Scatter plot range should be width+margin.left+margin.right
	let yScatter = d3.scaleLinear()
			.domain([0,d3.max(data,d => d.deaths)])
			.range([CHART_HEIGHT,0]);

        this.svg_scatter.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + CHART_HEIGHT + ")")
                .call(d3.axisBottom(xScatter));
        this.svg_scatter.append("g")
                .attr("class", "y axis")
                //.attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
                .call(d3.axisLeft(yScatter));

	this.scatter = this.svg_scatter.append('g')
                        .attr("class","circle_g")
                        .selectAll("dot")
                        .data(data)
                        //.attr("class", "scatter-plot")
			//.classed('scatter-plot',true)
			.enter()
                        .append("g").attr("class","scatter-plot")
			.append("circle")
				// .attr("class", "scatter-plot")
				//.attr("class","hovered")
                                .on("mouseover",function() {
                                        d3.select(this)
                                                .attr("class","hovered")
                                })
                                .on("mouseout",function(){
                                        d3.select(this)
                                                .attr("class","scatter-plot")
                                })
                                .on("click",function(e,datum){
                                        console.log("Cases: ",datum.cases,"Deaths: ",datum.deaths);

                                })
				.attr("cx", function(d){ return xScatter(d.cases); })
				.attr("cy", function(d){ return yScatter(d.deaths); })
				.attr("r", 7);	

  //TODO 
  // call each update function below, adjust the input for the functions if you need to.
}

/**
 * Update the bar chart
 */

function updateBarChart () {

        const dataFile = d3.select('#dataset').property('value');
        console.log("dataFile for update",dataFile);
        d3.csv(`data/${dataFile}.csv`)
        .then(dataOutput => {

        dResult = dataOutput.map((d) => ({
                cases: parseInt(d.cases),
                deaths: parseInt(d.deaths),
                date: d3.timeFormat("%m/%d")(d3.timeParse("%d-%b")(d.date))
        }));
        if (document.getElementById('random').checked) {
                // if random subset is selected
                randomData = randomSubset(dResult);
                dResult = randomData;
        }
        console.log("Bar random data: ",dResult);
        // d3.csv(`data/${dataFile}.csv`)
        //  .then(
        // let dResult => dataOutput2(d);
        // console.log("dresult: ",dResult);


	let yAxis = d3.select("#metric").node().value;

        let x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1)
                .domain(dResult.map(function(d) {return d.date;}));
                
                //.domain([0,d3.map(data,function(d) {console.log(d.deaths); return d.date;})])
                //.domain([0, d3.extent(data, d => d.date) ])
        let y = d3.scaleLinear().rangeRound([CHART_HEIGHT, 0])
                .domain([0,d3.max(dResult,function(d) {return d[yAxis];})]);



        this.svg_bar.selectAll("g.x.axis")
                .transition()
                .duration(250)
                .call(d3.axisBottom(x));
        this.svg_bar.selectAll("g.y.axis")
                .transition()
                .duration(500)
                .call(d3.axisLeft(y));


        this.bar = this.svg_bar.selectAll("g.rect_g").selectAll(".bar-chart").remove()
        this.bar = this.svg_bar
                   // .append("g").attr("class","rect_g")
                   .selectAll("g.rect_g")
                   .selectAll("rect")
                   .data(dResult)
                   .enter()
                   .append("g").attr("class","bar-chart")
                   .append("rect")
                   .on("mouseover",function() {
                        d3.select(this)
                                .attr("class","hovered")
                   })
                  .on("mouseout",function(){
                        d3.select(this)
                                .attr("class","bar-chart")
                  })
                   .transition()
                   .duration(2000)
                //    .attr("class","bar-chart")
                   .attr("x", function(d) { return x(d.date); })
                   .attr("y", function(d) { return y(d[yAxis]); })
                   .attr("width", x.bandwidth())
                   .attr("height", function(d) {return CHART_HEIGHT - y(d[yAxis])} );
           
                })

}	

/**
 * Update the line chart
 */
function updateLineChart () {
	const dataFile = d3.select('#dataset').property('value');
        console.log("dataFile for update",dataFile);
        d3.csv(`data/${dataFile}.csv`)
        .then(dataOutput => {

        dResult = dataOutput.map((d) => ({
                cases: parseInt(d.cases),
                deaths: parseInt(d.deaths),
                date: d3.timeFormat("%m/%d")(d3.timeParse("%d-%b")(d.date))
        }));
        if (document.getElementById('random').checked) {
                // if random subset is selected
                // dResult = randomSubset(dResult);
                dResult = randomData;
        }
        
        console.log("dresult: ",dResult);


	let yAxis = d3.select("#metric").node().value;

        let x = d3.scalePoint()
                .domain(d3.map(dResult, d => d.date))
                .range([0,CHART_WIDTH]);
                //.domain([0,d3.map(data,function(d) {console.log(d.deaths); return d.date;})])
                //.domain([0, d3.extent(data, d => d.date) ])
                            
    
        let y = d3.scaleLinear()
                .domain([0,d3.max(dResult,d => d[yAxis])])
                .range([CHART_HEIGHT, 0]);

        this.svg_linear.selectAll("g.x.axis")
                .transition()
                .duration(250)
                .call(d3.axisBottom(x));
        this.svg_linear.selectAll("g.y.axis")
                .transition()
                .duration(500)
                .call(d3.axisLeft(y));

        this.line
            .datum(dResult)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                        .x(function(d) { return x(d.date); })
                        .y(function(d) { return y(d[yAxis]); })
                )
        //     .attr("stroke", function(d){ return myColor(selectedGroup) })

        })
        // Give these new data to update line
}

/**
 * Update the area chart 
 */
function updateAreaChart () {
        const dataFile = d3.select('#dataset').property('value');
        console.log("dataFile for update",dataFile);
        d3.csv(`data/${dataFile}.csv`)
        .then(dataOutput => {

        dResult = dataOutput.map((d) => ({
                cases: parseInt(d.cases),
                deaths: parseInt(d.deaths),
                date: d3.timeFormat("%m/%d")(d3.timeParse("%d-%b")(d.date))
        }));
        if (document.getElementById('random').checked) {
                // if random subset is selected
                // dResult = randomSubset(dResult);
                dResult = randomData;
        }
        // d3.csv(`data/${dataFile}.csv`)
        //  .then(
        // let dResult => dataOutput2(d);
        console.log("dresult: ",dResult);


	let yAxis = d3.select("#metric").node().value;

        let x = d3.scalePoint()
                .domain(d3.map(dResult, d => d.date))
                .range([0,CHART_WIDTH]);
                //.domain([0,d3.map(data,function(d) {console.log(d.deaths); return d.date;})])
                //.domain([0, d3.extent(data, d => d.date) ])
                            
    
        let y = d3.scaleLinear()
                .domain([0,d3.max(dResult,d => d[yAxis])])
                .range([CHART_HEIGHT, 0]);

        this.svg_area.selectAll("g.x.axis")
                .transition()
                .duration(250)
                .call(d3.axisBottom(x));
        this.svg_area.selectAll("g.y.axis")
                .transition()
                .duration(500)
                .call(d3.axisLeft(y));
        

        this.area
                .datum(dResult)
                .transition()
                .duration(1000)
                // .attr("class", "area-chart")
                .attr("d", d3.area()
                        //.x(data, d => console.log("x val: ", d.date); xScale(+d.date))
                        //.y(data, d => console.log("y val: ",d.deaths); yScale(+d.deaths))
                        .x(function(d) { return x(d.date); })
                        .y1(function(d) {return y(d[yAxis]); })
			.y0(CHART_HEIGHT)
                );
        //     .attr("stroke", function(d){ return myColor(selectedGroup) })

        })
}

/**
 * update the scatter plot.
 */

function updateScatterPlot () {
        const dataFile = d3.select('#dataset').property('value');
        console.log("dataFile for update",dataFile);
        d3.csv(`data/${dataFile}.csv`)
        .then(dataOutput => {

        dResult = dataOutput.map((d) => ({
                cases: parseInt(d.cases),
                deaths: parseInt(d.deaths),
                date: d3.timeFormat("%m/%d")(d3.timeParse("%d-%b")(d.date))
        }));
        if (document.getElementById('random').checked) {
                // if random subset is selected
                // dResult = randomSubset(dResult);
                dResult = randomData;
        }
        console.log("scatter random data: ",dResult);
        // d3.csv(`data/${dataFile}.csv`)
        //  .then(
        // let dResult => dataOutput2(d);
        // console.log("dresult: ",dResult);


        let x = d3.scaleLinear()
                .domain([0,d3.max(dResult,d => d.cases)])
                .range([0,CHART_WIDTH]); // Scatter plot range should be width+margin.left+margin.right
        let y = d3.scaleLinear()
                .domain([0,d3.max(dResult,d => d.deaths)])
                .range([CHART_HEIGHT,0]);


        this.svg_scatter.selectAll("g.x.axis")
                .transition()
                .duration(250)
                .call(d3.axisBottom(x));
        this.svg_scatter.selectAll("g.y.axis")
                .transition()
                .duration(500)
                .call(d3.axisLeft(y));

        
        this.scatter = this.svg_scatter.selectAll("g.circle_g").selectAll(".scatter-plot").remove()
        this.scatter = this.svg_scatter
                .selectAll("g.circle_g")
                .selectAll("dot")
                .data(dResult)
                //.attr("class", "scatter-plot")
                //.classed('scatter-plot',true)
                .enter()
                        .append("g").attr("class","scatter-plot")
                        .append("circle")
                        // .attr("class", "scatter-plot")
                        .on("mouseover",function() {
                                d3.select(this)
                                        .attr("class","hovered")
                        })
                        .on("mouseout",function(){
                                d3.select(this)
                                        .attr("class","scatter-plot")
                        })
                        .on("click",function(e,datum){
                                console.log("Cases: ",datum.cases,"Deaths: ",datum.deaths);

                        })
                        .transition()
                        .duration(1500)
                        //.attr("class","hovered")
                        .attr("cx", function(d){ return x(d.cases); })
                        .attr("cy", function(d){ return y(d.deaths); })
                        .attr("r", 7);

        })
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
//       if (document.getElementById('random').checked) {
//         // if random subset is selected
//         update(randomSubset(dataResult));
//       } else {
//         update(dataResult);
//       }
      update(dataResult);




    }).catch(e => {
      console.log(e);
      alert('Error!');
    });


	d3.select("#dataset").on("change",function (event){
		// remove_graphs()
		// setup()
                updateBarChart()
                updateLineChart()
                updateAreaChart()
                updateScatterPlot()
	});

	d3.select("#metric").on("change",function (event){
                console.log(d3.select("#metric").node().value);
                // remove_graphs()
                // setup()
                updateBarChart()
                updateLineChart()
                updateAreaChart()
                updateScatterPlot()
        })

	d3.select("#random").on("change",function (event){
                // remove_graphs()
                // setup()
                console.log(d3.select("#random").node().value);
                // update(randomSubset(dataResult));
                updateBarChart()
                updateLineChart()
                updateAreaChart()
                updateScatterPlot()
        })
}

/**
 *  Slice out a random chunk of the provided in data
 *  @param data
 */
function randomSubset (data) {
  return data.filter((d) => Math.random() > 0.5);
}
