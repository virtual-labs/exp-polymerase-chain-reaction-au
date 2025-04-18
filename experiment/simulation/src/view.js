/**	 
* @author:anisha
* @filename:view.js
* @created 14-11-2016 11:00:50 AM
*/

(function() {
 angular.module('users')
  .directive("experiment", directiveFunction)
})();

var chain_reaction_stage, exp_canvas; /** Stage, canvas and tick timer for stage updation */

var cycle_number_int, copy_number_int, amplification_eff_int, y_val;

var dataplotArray = [[2,3],[4,5]];

function directiveFunction() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			/** Variable that decides if something should be drawn on mouse move */
			var experiment = true;
			if (element[0].width > element[0].height) {
				element[0].width = element[0].height;
				element[0].height = element[0].height;
			} else {
				element[0].width = element[0].width;
				element[0].height = element[0].width;
			}
			if (element[0].offsetWidth > element[0].offsetHeight) {
				element[0].offsetWidth = element[0].offsetHeight;
			} else {
				element[0].offsetWidth = element[0].offsetWidth;
				element[0].offsetHeight = element[0].offsetWidth;
			}
			exp_canvas = document.getElementById("demoCanvas");
			exp_canvas.width = element[0].width;
			exp_canvas.height = element[0].height;
			chain_reaction_stage = new createjs.Stage("demoCanvas");
			handleComplete(scope);
			chain_reaction_stage.enableDOMEvents(true);
			chain_reaction_stage.enableMouseOver();
			createjs.Touch.enable(chain_reaction_stage);
			function handleComplete(scope) {
				/** Loading images, text and containers */
				initialisationOfVariables(scope); /** Initializing the variables */
				translationLabels(); /** Translation of strings using gettext */
				makegraph();
				chain_reaction_stage.update();
			}
			/** Add all the strings used for the language translation here. '_' is the short cut for calling 
			the gettext function defined in the gettext-definition.js */
			function translationLabels() {
				/** This help array shows the hints for this experiment */
				help_array = [_("help1"), _("help2"), _("help3"), _("help4"),_("Next"), _("Close")];
				scope.heading = _("Polymerase Chain Reaction");
				scope.variables = _("Variables");
				scope.efct_effi_ampli_graph = _("Effect of Efficiency of amplification graph");
				scope.amplification_efficiency = _("Amplification Efficiency");
				scope.initial_copy_number = _("Initial Copy number");
				scope.cycle_num_label = _("Cycle number");
				scope.Reset = _("Reset");
				scope.result = _("Result");
				scope.copyright = _("copyright");
				chain_reaction_stage.update();
			}
		}
	}
	chain_reaction_stage.update();
}

/** All variables initialising in this function */
function initialisationOfVariables(scope) {
	dataplotArray.length = 0; 
	cycle_number_int = 15;
	copy_number_int = 5;
	amplification_eff_int = 70; 
	y_val = 0;
	chain_reaction_stage.update();
}