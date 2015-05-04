$(document).ready(function() {
	"use strict"

	$.fn.editable.defaults.mode = 'popup';
	
	$.fn.datepicker.defaults = {
			orientation : 'auto'
	}
	
	$.fn.editable.defaults.ajaxOptions = {
		type : 'PUT',
		dataType : 'json',
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		}
	};

	var prepareEditParameters = function(params) {
		var parameters = {};
		var time = moment(params.value, 'DD-MM-YYYY HH:mm');
		time = time.toDate();
		console.log(time.getTime());
		parameters[params.name] = time.getTime();
		return JSON.stringify(parameters);
	}

	var makeEditableDate = function(fname, furl, additional) {
		var editable = {
			type : 'combodate',
			name : fname,
			url : furl,
			send : 'always',
			format : 'DD-MM-YYYY HH:mm',
			template : 'DD / MM / YYYY / HH / mm',
			minuteStep : 1,
			params : function(params) {
				return prepareEditParameters(params);
			}
		}

		if (additional !== undefined) {
			additional(editable); // objects in JS are pass-by-reference so
			// this works
		}
		return editable;
	}

	var formatDate = function(date) {
		date = new Date(date);
		var dateString = date.getDate() + '-';
		dateString += date.getMonth() + 1 + '-';
		dateString += date.getFullYear() + ' ';
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

	var appendTimeEntry = function(holder, time) {
		var timeField = $('<td/>').addClass('centeredText');
		timeField.html(formatDate(time.time));
		timeField.editable(makeEditableDate('time', api.TimeEntries.timeURL + time.id));

		holder.append(timeField);
	}

	var listTimeEntries = function(runner) {
		var entryHolder = $('[data-runner-id=' + runner.id + ']');
		$.each(runner.times, function(index, time) {
			appendTimeEntry(entryHolder, time);
		})
	}

	var appendRunner = function(holder, runner) {
		var row = $('<tr/>').attr('data-runner-id', runner.id);

		var indexData = $('<td/>').addClass('centeredText').html('<b>' + runner.id + '</b>');
		var name = $('<td/>').addClass('centeredText').html('<b>' + runner.name + '</b>');
		var category = $('<td/>').addClass('centeredText').html('<b>' + runner.category.shortName + '</b>');

		row.append(indexData);
		row.append(name);
		row.append(category);

		holder.append(row);

		listTimeEntries(runner);
	}

	var listRunners = function(runners) {
		var holder = $('#runnerTable tbody');
		$.each(runners, function(index, runner) {
			appendRunner(holder, runner);

		});
	}

	api.aidStations.getAidStations(listAidStations);
	api.Runners.getRunners(listRunners);

});