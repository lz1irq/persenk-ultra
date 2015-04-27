persenkUltraServices.factory('AidStationFactory', [ '$http', function($http) {
	
	var stationURL = apiURL + 'stations/';
	
	this.getAidStations = function() {
		return $http.get(stationURL);
	};
	
	this.deleteAidStation = function(aidStationId) {
		return $http.delete(stationURL + aidStationId);
	};
	
	this.createAidStation = function(aidStation) {
		return $http.post(stationURL, aidStation);
	}
	
	this.updateAidStation = function(aidStation) {
		return $http.put(stationURL + aidStation.id, aidStation);
	}

	return this;
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
	
	$scope.createAidStation = function(aidStation) {
		AidStationFactory.createAidStation(aidStation).success(function(newStation) {
			console.log(newStation);
			$scope.aidStations.push(aidStation);

		}).error(function(errorMessage) {
			console.log(errorMessage);
		});
	}
	
	$scope.updateAidStation = function(aidStation) {
		AidStationFactory.updateAidStation(aidStation);
	}

	$scope.getAidStations();

} ]);