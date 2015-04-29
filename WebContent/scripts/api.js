'use strict'

var apiURL = '/persenk-ultra/api/';
var aidStationURL = apiURL + 'stations/';

var api = {}
api.aidStations = {};

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