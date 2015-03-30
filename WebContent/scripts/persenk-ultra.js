var api = 'http://localhost:8080/persenk-ultra/api/'

var categories = [];

function getCategories() {
	$.ajax({
		method : 'GET',
		url : api + 'categories'
	}).success(function(data, status, jqXHR) {
		categories.splice(0, categories.length); // clear the array
		$.each(data, function(index, category) {
			categories.push(category);
		});
	});
}

function listRunners() {
	$.ajax({
		method : 'GET',
		url : api + 'runners',
	}).success(function(data, status, jqXHR) {
		$.each(data, function(index, runner) {
			displayRunner(runner);
		});
	});
}

function displayRunner(runner) {
	var newRunner = $('<tr/>');
	newRunner.attr('data-runner-id', runner.id);

	// actions
	var runnerActions = $('<td/>');

	var deleteButton = $('<button/>').addClass('btn btn-defauappendlt');
	deleteButton.click(function() {
		deleteRunner(runner);
	});
	deleteButton.append($('<span/>').addClass('glyphicon glyphicon-remove'));
	runnerActions.append(deleteButton);
	newRunner.append(runnerActions);

	newRunner.append($('<td/>').text(runner.name));
	newRunner.append($('<td/>').text(runner.categoryId));

	$('#runners-list').append(newRunner);
}

function deleteRunner(runner) {

	var confirmMessage = "Are you sure you want to delete runner "
			+ runner.name + " ?";
	var confirmDelete = confirm(confirmMessage);

	if (confirmDelete) {
		$.ajax({
			method : 'DELETE',
			url : api + 'runners/' + runner.id,
		}).success(function(data, status, jqXHR) {
			if (status == 'nocontent') {
				$('tr[data-runner-id=' + runnerId + ']').remove();
			}
		});
	}
}

$(document).ready(function() {
	'use strict'

	listRunners();

});
