$(document).ready(function() {
	"use strict"

	var api = "http://private-43da-persenkultra.apiary-mock.com/"

	// selectors
	var tableHeaderSelector = "#table-header th:last";

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

});