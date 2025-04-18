/**	 
* @author:anisha
* @filename:experiment.js
* @created 14-11-2016 11:00:50 AM
*/

/** Get the copy number from the slider */
function getCopyNumber(copy_number) {
	copy_number_int = copy_number;
	chain_reaction_stage.update();
}

/** Get the cycle number from the slider */
function getCycleNumber(cycle_number) {
	cycle_number_int = cycle_number;
	chain_reaction_stage.update();
}

/** Get the Amplification Efficiency from the slider */
function getAmplificationEfficiency(amp_eff) {
	amplification_eff_int = amp_eff;
	chain_reaction_stage.update();
}

/** Plotting the graph using canvasjs */
function makegraph() {
	chart = new CanvasJS.Chart("graphDiv", {
		axisX: {
			title: _("Cycle number"),
			/** x axis label */
			titleFontSize: 22,
			/** Chart font size */
			labelFontSize: 18,
			minimum: 0,
			interval: 2
		},
		axisY: {
			title: _("Amount of DNA"),
			titleFontSize: 22,
			labelFontSize: 18,
			minimum: 0
		},
		showInLegend: false,
		data: [{
			color: "red",
			type: "line",
			markerType: "circle",
			lineThickness: 3,
			dataPoints: dataplotArray /** Datapoints to be plot, stored in the array */
		}]
	});
	chart.render();
	chain_reaction_stage.update();
}

/** When we click on the button for finfing the effect of efficiency of Amplification graphj it will call 
a function to find th e Xn value, where Xn is the Amount od DNA */
function graphPlotting(scope) {
	dataplotArray.length = 0;
	XnCalculation(copy_number_int, cycle_number_int, amplification_eff_int);
	chart.render();
	chain_reaction_stage.update();
}	
/** Calculation starts here */
function XnCalculation(x0, n, E) { //Function for getting the Xn value
	var copynum;
	/** Condition for drawing the graph,when the cycle number is less than three... */
	if (n > 2) {
		copynum = 2;
	} else {
		copynum = n;
	}
	for ( var j = 0; j <= copynum; j++ ) {
		/** Push zero in to the array XnValue, when the cycle number is in between 0 and 2.. */
		dataplotArray.push({
			x: j,
			y: 0
		});
		chart.render();
	}		
	for ( var i = 3; i <= n; i++ ) { /** Limit of the array is the cycle number	*/
		/** Xn for each cycle number is calculated Xn= (X0×(1+E/100))^(i-2)), where X0 is the copy number, 
		E is the amplification efficiency,n is the cycle number. */
		if ( n > 30 ) {
			chart.options.data[0].color
		}
		y_val = Number((x0 * Math.pow((1 + (E / 100)), i - 2)).toFixed(2));
		dataplotArray.push({
			x: i,
			y: y_val /** x and Y axis for the graph */
		});		
		// chart.options.axisX.interval = i+2;
		chart.render();
	}
	chain_reaction_stage.update();
}
/** Calculation ends here */
/** Set initial value of the experiment */
function resetExp(scope) {
	initialisationOfVariables();
	chart.render();	
	scope.Copynumber = scope.copy_num = copy_number_int;
	scope.cyclenumber = scope.cycle_number = cycle_number_int;
	scope.amplificationEff = scope.amp_eff = amplification_eff_int;		 
	chain_reaction_stage.update();
}