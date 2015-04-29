$(document).ready(function() {
	"use strict"
	
	var listAidStations = function(stations) {
		var header = $('#runnerTable thead tr');
		$.each(stations, function(index, station) {
			var stationName = $('<td/>');
			stationName.html('<b>' + station.name + '</b>');
			header.append(stationName); 
			console.log();
		});
	}
	
	var listRunners = function(runners) {
		var holder = $('#runnerTable tbody');
		$.each(runners, function(index, runner) {
			
			var row = $('<tr/>');
			var indexData = $('<td/>').html('<b>' + (index+1) + '</b>').attr('align', 'center');
			var name = $('<td/>').html('<b>' + runner.name + '</b>').attr('align', 'center');
			var category = $('<td/>').html('<b>' + runner.category.shortName + '</b>').attr('align', 'center');
			
			row.append(indexData);
			row.append(name);
			row.append(category);
			
			holder.append(row);
		});
	}
	
	api.aidStations.getAidStations(listAidStations);
	api.Runners.getRunners(listRunners);
});