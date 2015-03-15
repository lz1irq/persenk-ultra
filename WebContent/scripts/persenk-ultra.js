var api = "http://private-43da-persenkultra.apiary-mock.com/"

var categories = [];

function get_categories() {
	var category_name = "";
	$.ajax({
		type : "GET",
		url : api + "categories",
		async : false,
		success : function(categories) {
			console.log(categories);
			$.each(categories, function() {
				categories[this.id] = this.name;
				console.log(categories[this.id]);
			})
		}
	});
}

function resolve_category(category_id) {
	var category_name = "";
	$.ajax({
		type : "GET",
		url : api + "categories/" + category_id,
		async : false,
		success : function(category) {
			category_name = category.short_name;
		}
	});
	return category_name;
}

function add_runner(table, runner) {
	var row = $("<tr/>");
	row.append($("<td/>").text(runner.id));
	row.append($("<td/>").text(runner.name));
	row.append($("<td/>").text(resolve_category(runner.category)));
	add_runner_times(table, row, runner.id);
}

function add_runner_times(table, row, runner_id) {
	$.ajax({
		type : "GET",
		url : api + "time?runner=" + runner_id,
		success : function(times) {
			$.each(times, function() {
				row.append($("<td/>").text(this.time));
			});
			table.append(row);
		}
	});

}

$(document).ready(function() {
	"use strict"

	// selectors
	var tableHeaderSelector = "#table-header th:last";
	var tableTimesSelector = "#table-times"

	get_categories();

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
				add_runner(tableTimes, this);
			});
		}
	});

	var btnAddRunner = $("#btn-add-runner");
	btnAddRunner.click(function() {

		var runner = {
			name : $("#add-runner-name").val(),
			category : 1
		};

		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : api + "runners",
			data : runner,
			success : function(data, textStatus, jQxhr) {
				console.log(data);
				add_runner(tableTimes, data);
			},

		});
	})

});
