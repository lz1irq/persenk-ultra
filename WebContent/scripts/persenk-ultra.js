var api = "http://private-43da-persenkultra.apiary-mock.com/"

function resolve_category(category_id) {
	var category_name = "";
	$.ajax({
		type : "GET",
		url : api + "categories/" + category_id,
		async: false,
		success : function(category) {
			category_name = category.short_name;
		}
	})
	return category_name;
}

$(document).ready(
		function() {
			"use strict"

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

			// list all runners
			var tableTimes = $(tableTimesSelector);
			$.ajax({
				type : "GET",
				url : api + "runners",
				success : function(runners) {
					$.each(runners, function() {
						
						var runner_data = "<tr>" + "<td>" + this.id + "</td>";
						runner_data += "<td>" + this.name + "</td>";
						runner_data += "<td>" + resolve_category(this.category) + "</td>";
						
						$.ajax({
							type : "GET",
							url : api + "time?runner=" + this.id,
							async: false,
							success : function(times) {
								$.each(times, function() {
									runner_data += "<td>" + this.time + "</td>";
								});
							}
						});
						
						tableTimes.append(runner_data);
					});
				}
			});
			
			
			
			
			

		});
