$(document).ready(function() {
	"use strict"
	
	var formatDate = function(date) {
		var dateString = date.getDate() + '.';
		dateString += date.getMonth() + 1 + '<br />';
		dateString += date.getHours() + ':';
		dateString += date.getMinutes();
		return dateString;
	};
	
	var listAidStations = function(stations) {
		var header = $('#runnerTable thead tr');
		$.each(stations, function(index, station) {
			var stationName = $('<td/>').addClass('centeredText');
			stationName
			stationName.html('<b> AID#' + station.number + '</b>');
			header.append(stationName); 
		});
	}
	
	var listTimeEntries = function(times) {
		$.each(times, function(index, entry) {
			var runnerRow = $('[data-runner-id=' + entry.runner.id + ']');
			var timeField = runnerRow.find('[data-station-id=' + entry.aidStation.id + ']');
			timeField.addClass('centeredText');
			
			if(runnerRow !== undefined) {
				var date = new Date(entry.time*1000)
				var dateString = formatDate(date);
				timeField.html(dateString);
			}
		});
	}
	
	var listRunnerTimeFields = function(stations) {
		var runnerRows = $('[data-runner-id]');

		$('[data-runner-id]').each(function(index, row) {
			row = $(row); //convert to jQuery object
			$.each(stations, function(index, station) {
				var field = $('<td/>');
				field.attr('data-station-id', station.id);
				row.append(field);				
			});
			
		});
	}
	
	var listRunners = function(runners) {
		var holder = $('#runnerTable tbody');
		$.each(runners, function(index, runner) {
			
			var row = $('<tr/>').attr('data-runner-id', runner.id);
			
			var indexData = $('<td/>').addClass('centeredText').html('<b>' + (index+1) + '</b>')
			var name = $('<td/>').addClass('centeredText').html('<b>' + runner.name + '</b>')
			var category = $('<td/>').addClass('centeredText').html('<b>' + runner.category.shortName + '</b>')
			
			row.append(indexData);
			row.append(name);
			row.append(category);
			
			holder.append(row);
			
		});
	
	}
	
	var runnersFields = function(data) {
		listRunnerTimeFields(data);
		api.TimeEntries.getTimeEntries(listTimeEntries);
	}
	
	var runnersList = function(data) {
		listRunners(data);
		api.aidStations.getAidStations(runnersFields);
	}
	
	api.aidStations.getAidStations(listAidStations); //list all the aid stations in the header of the table
	//list all runners as table rows
	
	api.Runners.getRunners(runnersList);
	
});