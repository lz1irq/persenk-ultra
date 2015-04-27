persenkUltraServices.factory('RunnerFactory', [ '$http', function($http) {
	
	var runnerURL = apiURL + 'runners/';
	
	this.getRunners = function() {
		return $http.get(runnerURL);
	};
	
	this.deleteRunner = function(runnerId) {
		return $http.delete(runnerURL + runnerId);
	};
	
	this.createRunner = function(runner) {
		return $http.post(runnerURL, runner);
	}
	
	this.updateRunner = function(runner) {
		return $http.put(runnerURL + runner.id, runner);
	}
	
	/*HACK! While this is a violation of good programming principles, I need to do it this way
	 * in order to be able to finish this any time soon.
	 * TODO replace this call with a service*/
	
	this.getCategories = function() {
		return $http.get(apiURL + 'categories');
	}

	return this;
} ]);

persenkUltra.controller('RunnerController', [ '$scope', 'RunnerFactory', function($scope, RunnerFactory) {

	$scope.runners = [];
	$scope.categories = []; //part of the HACK! above
	$scope.selectedCategory = "";
	
	//more of the HACK!
	$scope.getCategories = function() { 
		RunnerFactory.getCategories().success(function(cats) {
			$scope.categories = cats;
		}).error(function(errorMsg) {
			console.log(errorMsg);
		});
	}
			
	$scope.getRunners = function() {
			
		RunnerFactory.getRunners().success(function(runners) {
			$scope.runners = runners;
		}).error(function(errorMessage) {
			console.log(errorMessage);
		});
	}
	
	$scope.deleteRunner = function(runnerId) {
		for(var index=0;index < $scope.runners.length;index++) {
			if($scope.runners[index].id === runnerId) {
				$scope.runners.splice(index, 1); //remove runner from local storage
				break;
			}
		}
		RunnerFactory.deleteRunner(runnerId);
	}
	
	$scope.createRunner = function(runner) {
		
		runner.category = $scope.selectedCategory;
		
		for(i = 0; i < $scope.categories.length; i++) {
			if($scope.categories[i].name === runner.category) {
				runner.category = $scope.categories[i].category;
				break;
			}
		}
		
		RunnerFactory.createRunner(runner).success(function(runner) {
			console.log(runner);
			$scope.runners.push(runner);

		}).error(function(errorMessage) {
			console.log(errorMessage);
		});
	}
	
	$scope.updateRunner = function(runner) {
		RunnerFactory.updateRunner(runner);
	}

	$scope.getCategories();
	$scope.getRunners();
	

} ]);