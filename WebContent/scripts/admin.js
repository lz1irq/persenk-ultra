$(document).ready(function() {
	"use strict"
	
	var listAidStations = function(stations) {
		var stationHolder = $('#stationsTable tbody');
		
		$.each(stations, function(index, station) {
			var stationRow = $('<tr/>');
			
			var numberField = $('<td/>').html(station.number);
			numberField.addClass('centeredText');
			stationRow.append(numberField);
			
			var nameField = $('<td/>').html(station.name);
			nameField.addClass('centeredText');
			stationRow.append(nameField);
			
			var distanceField = $('<td/>').html(station.distance);
			distanceField.addClass('centeredText');
			
			stationRow.append(distanceField);
			
			stationHolder.append(stationRow);
			
		});
	};
	
	var listCategories = function(categories) {
		var categoryHolder = $('#categoriesTable tbody');
		
		$.each(categories, function(index, category) {
			var categoryRow = $('<tr/>');
			
			var numberField = $('<td/>').html(index+1);
			numberField.addClass('centeredText');
			categoryRow.append(numberField);
			
			var nameField = $('<td/>').html(category.name);
			nameField.addClass('centeredText');
			categoryRow.append(nameField);
			
			var distanceField = $('<td/>').html(category.shortName);
			distanceField.addClass('centeredText');
			categoryRow.append(distanceField);
			
			categoryHolder.append(categoryRow);
		})
	};
	
	api.aidStations.getAidStations(listAidStations);
	api.Categories.getCategories(listCategories);
	
});