"use strict"
var apiURL = '/persenk-ultra/api/';

var persenkUltraServices = angular.module('persenkUltraServices', [ 'ngResource' ]);

var persenkUltra = angular.module('persenkUltra', [ 'ngRoute', 'persenkUltraServices', 'ui.bootstrap', 'xeditable']);

persenkUltra.run(function(editableOptions) {
	  editableOptions.theme = 'bs3';
	});

persenkUltra.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/table', {
		templateUrl : 'views/table.html'
	}).when('/admin', {
		templateUrl : 'views/admin.html'
	}).when('/about', {
		templateUrl : 'views/about.html'
	}).when('/contacts', {
		redirectTo : '/about'
	}).when('/login', {
		templateUrl : 'views/login.html'
	}).otherwise({
		redirectTo : '/table'
	});
} ]);

persenkUltra.controller('HeaderController', [ '$scope', '$location', function($scope, $location) {
	$scope.isActive = function(viewLocation) {
		return viewLocation === $location.path();
	};
} ]);

persenkUltra.controller('adminUIController', function($scope) {
	$scope.status = {
		isFirstOpen : true,
		isFirstDisabled : false
	};
});

