persenkUltraServices.factory('RunnerFactory', [ '$http', function($http) {
	this.getRunners = function() {
		return $http.get(apiURL + 'runners');
	}

	return this;
} ]);

persenkUltra.controller('RunnerController', [ '$scope', 'RunnerFactory', function($scope, RunnerFactory) {
	$scope.getRunners = function() {
		RunnerFactory.getRunners().success(function(runners) {
			$scope.runners = runners;
		}).error(function(errorMessage) {
			console.log(errorMessage); 
		});
	}

	$scope.getRunners();

} ]);