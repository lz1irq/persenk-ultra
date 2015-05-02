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

			var numberField = $('<td/>').html(index + 1);
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

	var listRunners = function(runners) {
		var runnerHolder = $('#runnersTable tbody');

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
			api.aidStations.createAidStation(newAidStation, function(data) {
				console.log(data);
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
			api.Categories.createCategory(newCategory, function(data) {
				console.log(data);
			})
		}
	});

	api.aidStations.getAidStations(listAidStations);
	api.Categories.getCategories(listCategories);
	api.Runners.getRunners(listRunners);

});