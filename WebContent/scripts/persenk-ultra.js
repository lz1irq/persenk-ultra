var apiURL = 'http://localhost:8080/persenk-ultra/api/';

var persenkUltraServices = angular.module('persenkUltraServices', [ 'ngResource' ]);

persenkUltraServices.factory('AidStation', function($resource) {
	return $resource(apiURL + 'stations/', {}, {
		'query' : {
			method : 'GET',
			isArray : true
		}
	});
})

persenkUltraServices.factory('Runners', function($resource) {
	return $resource(apiURL + 'runners/', {}, {
		'query' : {
			method : 'GET',
			isArray : true
		}
	})
});

var persenkUltraControllers = angular.module('persenkUltra', [ 'persenkUltraServices' ]);

persenkUltraControllers.controller('AidStationController', [ '$scope', 'AidStation', function($scope, AidStation) {
	$scope.aidStations = AidStation.query();
} ]);

persenkUltraControllers.controller('RunnerController', ['$scope', 'Runners', function($scope, Runners) {
	$scope.runners = Runners.query();
} ]);