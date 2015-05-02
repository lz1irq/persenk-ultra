$(document).ready(function() {
	"use strict"

	var runnerHolder = $('#runnersTable tbody');
	var stationHolder = $('#stationsTable tbody');
	var categoryHolder = $('#categoriesTable tbody');
	
	var categoryCounter = 0;

	var appendAidStation = function(holder, station) {
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

		holder.append(stationRow);
	}

	var appendCategory = function(holder, category) {
		
		categoryCounter++;
		
		var categoryRow = $('<tr/>');

		var numberField = $('<td/>').html(categoryCounter);
		numberField.addClass('centeredText');
		categoryRow.append(numberField);

		var nameField = $('<td/>').html(category.name);
		nameField.addClass('centeredText');
		categoryRow.append(nameField);

		var distanceField = $('<td/>').html(category.shortName);
		distanceField.addClass('centeredText');
		categoryRow.append(distanceField);

		categoryHolder.append(categoryRow);
		
		
	}

	var listAidStations = function(stations) {
		$.each(stations, function(index, station) {
			appendAidStation(stationHolder, station);
		});
	};

	var listCategories = function(categories) {
		$.each(categories, function(index, category) {
			appendCategory(categoryHolder, category);
		})
	};

	var listRunners = function(runners) {
		$.each(runners, function(index, runner) {
			var runnerRow = $('<tr/>');

			var numberField = $('<td/>').html(runner.id);
			numberField.addClass('centeredText');
			runnerRow.append(numberField);

			var nameField = $('<td/>').html(runner.name);
			nameField.addClass('centeredText');
			runnerRow.append(nameField);

			var categoryField = $('<td/>').html(runner.category.name);
			categoryField.addClass('centeredText');
			runnerRow.append(categoryField);

			runnerHolder.append(runnerRow);
		})
	}

	$('#createStationButton').on('click', function(event) {
		event.preventDefault(); // stop the page from reloading

		var stationNumber = $('#stationNumberField').val();
		var stationName = $('#stationNameField').val();
		var stationDistance = $('#stationDistanceField').val();

		if (stationNumber != '' && stationName != '' && stationDistance != '') {
			var newAidStation = {
				number : stationNumber,
				name : stationName,
				distance : stationDistance
			}
			api.aidStations.createAidStation(newAidStation, function(station) {
				console.log(station)
				appendAidStation(stationHolder, station);
			})
		}
	});

	$('#createCategoryButton').on('click', function(event) {
		event.preventDefault(); // stop the page from reloading

		var categoryName = $('#categoryNameField').val();
		var categoryShortName = $('#categoryShortNameField').val();

		console.log(categoryShortName);
		console.log(categoryName);

		if (categoryName != '' && categoryShortName != '') {
			var newCategory = {
				name : categoryName,
				shortName : categoryShortName
			}
			api.Categories.createCategory(newCategory, function(category) {
				appendCategory(categoryHolder, category);
			})
		}
	});

	api.aidStations.getAidStations(listAidStations);
	api.Categories.getCategories(listCategories);
	api.Runners.getRunners(listRunners);

});