'use strict'

var apiURL = '/persenk-ultra/api/';
var aidStationURL = apiURL + 'stations/';
var runnerURL = apiURL + 'runners/'

var api = {}
api.aidStations = {};
api.Runners = {};

api.aidStations.getAidStations = function(callback) {
	var request = $.ajax({
		url : aidStationURL,
		method : 'GET',
		dataType : "json",
		success : function(data, status, jqXHR) {
			if(callback !== undefined) {
				callback(data);
			}
		}
	});
	
}

api.Runners.getRunners = function(callback) {
	var request = $.ajax({
		url : runnerURL,
		method : 'GET',
		dataType : "json",
		success : function(data, status, jqXHR) {
			if(callback !== undefined) {
				callback(data);
			}
		}
	});
}