/**	 
* @author:anisha
* @filename:user_controller.js
* @created 14-11-2016 11:00:50 AM
*/

(function() {
 angular.module('users', ['FBAngular'])
  .controller('UserController', [
   '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope', '$element', 'Fullscreen', '$mdToast', '$animate',
   UserController
  ]);

 /**
  * Main Controller for the Angular Material Starter App
  * @param $scope
  * @param $mdSidenav
  * @param avatarsService
  * @constructor
  */
 function UserController($mdSidenav, $mdBottomSheet, $log, $q, $scope, $element, Fullscreen, $mdToast, $animate) {
	$scope.toastPosition = {
		bottom: true,
		top: false,
		left: true,
		right: false
	};
	$scope.toggleSidenav = function(ev) {
		$mdSidenav('right').toggle();
	};
	$scope.getToastPosition = function() {
		return Object.keys($scope.toastPosition)
		.filter(function(pos) {
		return $scope.toastPosition[pos];
		})
		.join(' ');
	};
  $scope.showActionToast = function() {
	var toast = $mdToast.simple()
	.content(help_array[0])
	.action(help_array[4])
	.hideDelay(15000)
	.highlightAction(false)
	.position($scope.getToastPosition());

	var toast1 = $mdToast.simple()
	.content(help_array[1])
	.action(help_array[4])
	.hideDelay(15000)
	.highlightAction(false)
	.position($scope.getToastPosition());

	var toast2 = $mdToast.simple()
	.content(help_array[2])
	.action(help_array[4])
	.hideDelay(15000)
	.highlightAction(false)
	.position($scope.getToastPosition());

	var toast3 = $mdToast.simple()
	.content(help_array[3])
	.action(help_array[5])
	.hideDelay(15000)
	.highlightAction(false)
	.position($scope.getToastPosition());
	
	$mdToast.show(toast).then(function() {
		$mdToast.show(toast1).then(function() {
			$mdToast.show(toast2).then(function() {
				$mdToast.show(toast3).then(function() {
				});
			});
		});
	});
  };
  var self = this;
  self.selected = null;
  self.users = [];
  self.toggleList = toggleUsersList;

  $scope.showValue = false; /** It hides the 'Result' tab */
  $scope.showVariables = false; /** I hides the 'Variables' tab */
  $scope.isActive = true;
  $scope.isActive1 = true;

  /** Initial value settings of wells drop downs */
  $scope.cycle_number = 15;
  $scope.copy_num = 5;
  $scope.amp_eff = 70;
  $scope.Copynumber = $scope.copy_num;
  $scope.cyclenumber = $scope.cycle_number;
  $scope.amplificationEff = $scope.amp_eff;
  $scope.goFullscreen = function() {
		/** Full screen */
		if (Fullscreen.isEnabled())
		Fullscreen.cancel();
		else
		Fullscreen.all();
		/** Set Full screen to a specific element (bad practice) */
		/** Full screen.enable( document.getElementById('img') ) */
  };
  	$scope.resetExp = function() {
		$mdToast.cancel();
		resetExp($scope);
	}
	$scope.toggle = function() {
		$scope.showValue = !$scope.showValue;
		$scope.isActive = !$scope.isActive;
	};
	$scope.toggle1 = function() {
		$scope.showVariables = !$scope.showVariables;
		$scope.isActive1 = !$scope.isActive1;
	};
		/**slider copy number*/
	$scope.changeCopynumber = function() {
		$scope.copy_num = $scope.Copynumber;
		getCopyNumber($scope.Copynumber);
	}
	/**slider cycle number*/
	$scope.changeCycleNumber = function() {
		$scope.cycle_number = $scope.cyclenumber;
		getCycleNumber($scope.cyclenumber);
	}
		/**slider amplification efficiency*/
	$scope.changeAmplification = function() {
		$scope.amp_eff = $scope.amplificationEff;
		getAmplificationEfficiency($scope.amplificationEff);
	}
	/** Click event function of find the effect of amplification efficiency*/ 
	$scope.startSimulator = function() {}
		$scope.startPlotting = function() {
		graphPlotting($scope);
	}
   /** 
    * First hide the bottom sheet IF visible, then
    * hide or Show the 'left' sideNav area
    */
	function toggleUsersList() {
		$mdSidenav('right').toggle();
	}  
 }
})();