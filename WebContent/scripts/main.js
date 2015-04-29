$(document).ready(function() {
	"use strict"
	
	var listAidStations = function(stations) {
		var header = $('#runnersTable thead tr td:last');
		$.each(stations, function(index, station) {
			var td = $('<td/>');
			td.html('<b>' + station.name + '</b>');
			header.after(td); 
			console.log();
		});
	}
	
	api.aidStations.getAidStations(listAidStations);
});