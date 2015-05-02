'use strict'

var apiURL = '/persenk-ultra/api/';
var aidStationURL = apiURL + 'stations/';
var runnerURL = apiURL + 'runners/'
var timeURL = apiURL + 'time/';
var categoryURL = apiURL + 'categories/';

var api = {}
api.aidStations = {};
api.Runners = {};
api.TimeEntries = {};
api.Categories = {};

api.aidStations.getAidStations = function(callback) {
	var request = $.ajax({
		url : aidStationURL,
		method : 'GET',
		dataType : "json",
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
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
			if (callback !== undefined) {
				callback(data);
			}
		}
	});
}

api.TimeEntries.getTimeEntries = function(callback) {
	var request = $.ajax({
		url : timeURL,
		method : 'GET',
		dataType : "json",
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
				callback(data);
			}
		}
	});
}

api.Categories.getCategories = function(callback) {
	var request = $.ajax({
		url : categoryURL,
		method : 'GET',
		dataType : "json",
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
				callback(data);
			}
		}
	});	
}

