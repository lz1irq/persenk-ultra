$(document).ready(function() {
	"use strict"

	var runnerHolder = $('#runnersTable tbody');
	var stationHolder = $('#stationsTable tbody');
	var categoryHolder = $('#categoriesTable tbody');

	var categoryDropdown = $('#runnerCategoryField');

	var categoryCounter = 0;
	
	var appendRunner = function(holder, runner) {
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
	}

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
	};

	var appendCategory = function(holder, category) {
		// add category to table
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

		// add category to dropdown menu for creating a new runner
		var categoryOption = $('<option/>');
		categoryOption.val(category.name);
		categoryOption.html(category.name);
		categoryOption.attr('data-category-id', category.id);
		categoryDropdown.append(categoryOption);

	};

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
			appendRunner(runnerHolder, runner);
		})
	};

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
			};
			
			api.aidStations.createAidStation(newAidStation, function(station) {
				appendAidStation(stationHolder, station);
			})
		}
	});

	var getCategoryIdByName = function(name) {
		var categoryRow = $('[value="' + name + '"]');
		return categoryRow.attr('data-category-id');
	};

	$('#createCategoryButton').on('click', function(event) {
		event.preventDefault(); // stop the page from reloading

		var categoryName = $('#categoryNameField').val();
		var categoryShortName = $('#categoryShortNameField').val();

		if (categoryName != '' && categoryShortName != '') {

			var categoryId = getCategoryIdByName(categoryName);

			var newCategory = {
				name : categoryName,
				shortName : categoryShortName,
				category : {
					id : categoryId
				}
			};
			
			api.Categories.createCategory(newCategory, function(category) {
				appendCategory(categoryHolder, category);
			})
		}
	});

	$('#createRunnerButton').on('click', function(event) {
		event.preventDefault(); // stop the page from reloading

		var runnerName = $('#runnerNameField').val();
		var runnerCategoryName = $('#runnerCategoryField').val();
		
		var category = {
				id : getCategoryIdByName(runnerCategoryName)
		};

		if (runnerName != '' && runnerCategoryName != '') {
			var newRunner = {
				name : runnerName,
				category : category,
				times : []
			}
			api.Runners.createRunner(newRunner, function(runner) {
				appendRunner(runnerHolder, runner);
			});
		}
	});

	api.aidStations.getAidStations(listAidStations);
	api.Categories.getCategories(listCategories);
	api.Runners.getRunners(listRunners);

});