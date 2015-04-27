"use strict"
var apiURL = '/persenk-ultra/api/';

var persenkUltraServices = angular.module('persenkUltraServices', [ 'ngResource' ]);

persenkUltraServices.factory('AidStationFactory', [ '$http', function($http) {
	
	var baseURL = apiURL + 'stations/';
	
	this.getAidStations = function() {
		return $http.get(baseURL);
	};
	
	this.deleteAidStation = function(aidStationId) {
		return $http.delete(baseURL + aidStationId);
	};

	return this;
} ]);

persenkUltraServices.factory('RunnerFactory', [ '$http', function($http) {
	this.getRunners = function() {
		return $http.get(apiURL + 'runners');
	}

	return this;
} ]);

var persenkUltra = angular.module('persenkUltra', [ 'ngRoute', 'persenkUltraServices', 'ui.bootstrap' ]);
persenkUltra.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/table', {
		templateUrl : 'views/table.html'
	}).when('/admin', {
		templateUrl : 'views/admin.html'
	}).when('/about', {
		templateUrl : 'views/about.html'
	}).when('/contacts', {
		redirectTo : '/about'
	}).otherwise({
		redirectTo : '/table'
	});
} ]);

persenkUltra.controller('HeaderController', [ '$scope', '$location', function($scope, $location) {
	$scope.isActive = function(viewLocation) {
		return viewLocation === $location.path();
	};
} ]);

persenkUltra.controller('AidStationController', [ '$scope', 'AidStationFactory', function($scope, AidStationFactory) {

	$scope.aidStations = [];
	
	$scope.getAidStations = function() {
		AidStationFactory.getAidStations().success(function(stations) {
			$scope.aidStations = stations;
		}).error(function(errorMessage) {
			console.log(errorMessage);
			$scope.status = "Unable to load aid station data: " + errorMessage;
		});
	}
	
	$scope.deleteAidStation = function(aidStationId) {
		for(var index=0;index < $scope.aidStations.length;index++) {
			if($scope.aidStations[index].id === aidStationId) {
				$scope.aidStations.splice(index, 1);
				break;
			}
		}
		AidStationFactory.deleteAidStation(aidStationId);
	}

	$scope.getAidStations();

} ]);

persenkUltra.controller('RunnerController', [ '$scope', 'RunnerFactory', function($scope, RunnerFactory) {
	$scope.getRunners = function() {
		RunnerFactory.getRunners().success(function(runners) {
			$scope.runners = runners;
		}).error(function(errorMessage) {
			console.log(errorMessage);
			$scope.status = "Unable to load aid station data: " + errorMessage;
		});
	}

	$scope.getRunners();

} ]);

persenkUltra.controller('adminUIController', function($scope) {
	$scope.status = {
		isFirstOpen : true,
		isFirstDisabled : false
	};
});
