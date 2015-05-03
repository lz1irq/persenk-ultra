$(document).ready(function() {
	"use strict"
	
	$.fn.editable.defaults.ajaxOptions = {
			type: 'PUT',
			dataType : 'json',
			headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
		    }
	};

	var runnerHolder = $('#runnersTable tbody');
	var stationHolder = $('#stationsTable tbody');
	var categoryHolder = $('#categoriesTable tbody');

	var categoryDropdown = $('#runnerCategoryField');

	var categoryCounter = 0;
	
	var createDeleteButton = function(clickCallback) {
		var deleteButton = $('<button/>').addClass('button button-default');
		deleteButton.html($('<span/>').addClass('glyphicon glyphicon-trash'));
		
		if(clickCallback !== undefined) deleteButton.on('click', clickCallback);
		
		return deleteButton;
	}	
	
	
	/* 
	 * By default, x-editable sends to the server the following object:
	 * { pk : 1, name : 'name', value : 'newvalue'}
	 * which does not work with the existing API. The following 
	 * function takes the default parameter variable and alters it
	 * appropriately - the server is only being sent a { variable : value} object.
	 * It also formats the object to proper JSON.
	 * */
	var prepareEditParameters = function(params) {
		var parameters = {};
		parameters[params.name] = params.value;
		console.log(parameters);
		return JSON.stringify(parameters);
	}
	
	var makeEditable = function(ftype, fname, furl) {
		return {
		    type: ftype,
		    name : fname,
		    url: furl,
		    send : 'always',
		    params: function(params) { 
		    	console.log(params);
		    	return prepareEditParameters(params);
		    }
		}
	}
	
	var appendRunner = function(holder, runner) {
		var runnerRow = $('<tr/>');
		runnerRow.attr('data-runner-id', runner.id); //used for dynamic removal from the table

		var numberField = $('<td/>').html(runner.id);
		numberField.addClass('centeredText');
		runnerRow.append(numberField);

		var nameField = $('<td/>').html(runner.name);
		nameField.addClass('centeredText');
		runnerRow.append(nameField);

		var categoryField = $('<td/>').html(runner.category.name);
		categoryField.addClass('centeredText');
		runnerRow.append(categoryField);
		
		var actionField = $('<td/>').addClass('centeredText');
		
		actionField.append(createDeleteButton(function() {
			api.Runners.deleteRunner(runner.id, function() {
				$('[data-runner-id=' + runner.id + ']').remove();
			})
		}));
		runnerRow.append(actionField);
		
		runnerHolder.append(runnerRow);
	}

	var appendAidStation = function(holder, station) {
		
		var stationURL = api.aidStations.stationURL + station.id
		
		var stationRow = $('<tr/>');
		stationRow.attr('data-station-id', station.id);
		
		var numberField = $('<td/>').html(station.number);
		numberField.addClass('centeredText');
		numberField.editable(makeEditable('text', 'number', stationURL));
		
		stationRow.append(numberField);

		var nameField = $('<td/>').html(station.name);
		nameField.addClass('centeredText');
		nameField.editable(makeEditable('text', 'name', stationURL));
		stationRow.append(nameField);

		var distanceField = $('<td/>').html(station.distance);
		distanceField.addClass('centeredText');
		distanceField.editable(makeEditable('text', 'distance', stationURL));
		stationRow.append(distanceField);
		
		var actionField = $('<td/>').addClass('centeredText');
		actionField.append(createDeleteButton(function() {
			api.aidStations.deleteAidStation(station.id, function() {
				$('[data-station-id=' + station.id + ']').remove();
			});
		}))
		stationRow.append(actionField);

		holder.append(stationRow);
	};

	var appendCategory = function(holder, category) {
		// add category to table
		categoryCounter++;

		var categoryRow = $('<tr/>');
		categoryRow.attr('data-category-id', category.id);

		var numberField = $('<td/>').html(categoryCounter);
		numberField.addClass('centeredText');
		categoryRow.append(numberField);

		var nameField = $('<td/>').html(category.name);
		nameField.addClass('centeredText');
		categoryRow.append(nameField);

		var distanceField = $('<td/>').html(category.shortName);
		distanceField.addClass('centeredText');
		categoryRow.append(distanceField);
		
		var actionField = $('<td/>').addClass('centeredText');
		actionField.append(createDeleteButton(function() {
			api.Categories.deleteCategory(category.id, function() {
				$('[data-category-id=' + category.id + ']').remove();
			})
		}));
		categoryRow.append(actionField);

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

			var newCategory = {
				name : categoryName,
				shortName : categoryShortName,
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
				 $('#runnerNameField').val(''); //clear the fields in the html
			});
		}
	});

	api.aidStations.getAidStations(listAidStations);
	api.Categories.getCategories(listCategories);
	api.Runners.getRunners(listRunners);

});