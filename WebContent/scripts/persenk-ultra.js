$(document).ready(function() {
	"use strict"

	var api = "http://private-43da-persenkultra.apiary-mock.com/"

	// selectors
	var tableHeaderSelector = "#table-header th:last";
	var tableTimesSelector = "#table-times"

	// populate table headers with the aid-station codes
	var tableHeader = $(tableHeaderSelector);
	$.ajax({
		type : "GET",
		url : api + "station",
		success : function(aid_stations) {
			$.each(aid_stations, function() {
				tableHeader.after("<th>" + "A" + this.id + "</th>");
				tableHeader = $(tableHeaderSelector);
			});
		}
	});
	
	//list all runners
	var tableTimes = $(tableTimesSelector);
	$.ajax({
		type : "GET",
		url : api + "runners",
		success : function(runners) {
			$.each(runners, function() {
				tableTimes.append("<tr>" + "<td>" + this.id + "</td>" + "<td>" + this.name + "</td>" + "</tr>");
			});
		}
			});

		});