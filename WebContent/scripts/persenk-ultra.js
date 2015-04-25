"use strict"
var apiURL = 'http://localhost:8080/persenk-ultra/api/';

var persenkUltraServices = angular.module('persenkUltraServices', [ 'ngResource' ]);

persenkUltraServices.factory('AidStationFactory', [ '$http', function($http) {
	this.getAidStations = function() {
		return $http.get(apiURL + 'stations');
	};

	return this;
} ]);

persenkUltraServices.factory('RunnerFactory', [ '$http', function($http) {
	this.getRunners = function() {
		return $http.get(apiURL + 'runners');
	}
	
	return this;
} ]);

var persenkUltra = angular.module('persenkUltra', [ 'persenkUltraServices' ]);

persenkUltra.controller('AidStationController', [ '$scope', 'AidStationFactory', function($scope, AidStationFactory) {

	$scope.getAidStations = function() {
		AidStationFactory.getAidStations()
		.success(function(stations) {
			$scope.aidStations = stations;
		}).error(function(errorMessage) {
			console.log(errorMessage);
			$scope.status = "Unable to load aid station data: " + errorMessage;
		});
	}

	$scope.getAidStations();

} ]);

persenkUltra.controller('RunnerController', [ '$scope', 'RunnerFactory', function($scope, RunnerFactory) {
	$scope.getRunners = function() {
		RunnerFactory.getRunners()
		.success(function(runners) {
			$scope.runners = runners;
		})
		.error(function(errorMessage) {
			console.log(errorMessage);
			$scope.status = "Unable to load aid station data: " + errorMessage;
		});
	}
	
	$scope.getRunners();

} ]);
