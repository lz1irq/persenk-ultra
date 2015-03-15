var api = 'http://private-43da-persenkultra.apiary-mock.com/'

var categories = [];

function get_categories() {
	var category_name = '';
	$.ajax({
		type : 'GET',
		url : api + 'categories',
		async : false,
		success : function(cats) {
			cats.sort(function(a, b) {
				return a.id - b.id;
			})
			$.each(cats, function() {
				categories[this.id] = this;
			})
		}
	});
}

function get_category_id(cat_name) {
	var cat_id = -1;
	$.each(categories, function() {
		if (this.name == cat_name) {
			cat_id = this.id;
		}
	})
	return cat_id;
}

function fill_categories() {
	$('.dropdown-menu').empty();
	
	$.each(categories, function() {
		$('.dropdown-menu').append(
				'<li role="presentation"><a role="menuitem" tabindex="-1" href="#">'
						+ this.name + '</a></li>');
	})
	
	$('.dropdown-menu li a').click(function() {
		var selText = $(this).text();
		$('#dropdownCategory').html(selText + ' <span class="caret"></span>');
	});
}

function add_runner(table, runner) {
	var row = $('<tr/>');

	var del = $('<td/>').html('<span class="glyphicon glyphicon-remove"></span>');
	del.click(function() {
		$.ajax({
			type : 'DELETE',
			url : api + 'runners/' + runner.id,
			success : function(response) {
				row.remove();
			}
		});
	})
	row.append(del);
	
	
	row.attr('data-runner', runner.id);
	row.append($('<td/>').text(runner.id));

	var nameCell = $('<td/>').text(runner.name);
	nameCell.editable({
		send : 'always',
		type : 'text',
		url : api + 'posts/' + runner.id,
		pk : 0,
		id : 0,

		ajaxOptions : {
			type : 'PUT',
			url : api + 'runners/' + runner.id,
		},
		data : {
			"id" : runner.id,
			"name" : runner.name,
			"category" : runner.category
		}
	});

	row.append(nameCell);
	row.append($('<td/>').text(categories[runner.category].short_name));

	add_runner_times(table, row, runner.id);
}

function add_runner_times(table, row, runner_id) {
	console.log(runner_id);
	$.ajax({
		type : 'GET',
		url : api + 'time?runner=' + runner_id,
		success : function(times) {
			$.each(times, function() {
				var timeCell = $('<td/>');
				timeCell.attr('data-time-id', this.id);
				timeCell.attr('data-station', this.station)
				timeCell.text(this.time);

				var thisTime = this;

				timeCell.editable({
					send : 'always',
					type : 'text',
					url : api + 'time/' + thisTime.id,
					pk : 0,
					id : 0,

					ajaxOptions : {
						type : 'PUT',
						url : api + 'time/' + thisTime.id,
					},
					data : {
						"runner" : thisTime.runner,
						"station" : thisTime.station,
						"time" : 0,
					},
					success : function(response, newValue) {
						console.log(newValue);
					}
				});

				row.append(timeCell);

			});

			table.append(row);
			$('table').trigger('update');
			var sorting = [ [ 0, 0 ] ];
			$('table').trigger('sorton', [ sorting ]);
		}
	});

}

$(document).ready(function() {
	'use strict'

	// library setup
	$.fn.editable.defaults.mode = 'inline';

	// selectors
	var tableHeaderSelector = '#table-header th:last';
	var tableTimesSelector = '#table-times'

	get_categories();
	fill_categories();

	// populate table headers with the aid-station codes
	var tableHeader = $(tableHeaderSelector);
	$.ajax({
		type : 'GET',
		url : api + 'station',
		success : function(aid_stations) {
			$.each(aid_stations, function() {
				tableHeader.after('<th>' + 'A' + this.id + '</th>');
				tableHeader = $(tableHeaderSelector);
			});
		}
	});

	// $.fn.editable.defaults.mode = 'inline';

	// list all runners
	var tableTimes = $(tableTimesSelector);
	$.ajax({
		type : 'GET',
		url : api + 'runners',
		success : function(runner_array) {
			runner_array.sort(function(a, b) {
				return a.id - b.id;
			});
			$.each(runner_array, function() {
				add_runner(tableTimes, this);
			});
			$('table').tablesorter();
		}
	});

	// adding a runner
	var btnAddRunner = $('#btn-add-runner');
	btnAddRunner.click(function() {
		var runner = {
			name : $('#add-runner-name').val(),
			category : 1
		};

		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : api + 'runners',
			data : runner,
			success : function(data, textStatus, jQxhr) {
				$.ajax({
					type : 'GET',
					url : api + 'runners/' + data.id,
					success : function(new_runner) {
						add_runner(tableTimes, new_runner);
					}
				});
			},

		});
	})

	
	
	$("#search-field").keyup(function() {
        var value = this.value.toLowerCase().trim();

        $("#table-times").find("tr").each(function(index) {
            var id = $(this).find("td").eq(2).text().toLowerCase().trim();
            $(this).toggle(id.indexOf(value) !== -1);
        });
    });
	
	$('#btn-add-category').click(function() {
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : api + 'categories',
			data : {
				name : $('#add-category-name').val(),
				short_name : $('#add-category-short-name').val()
			},
			success : function(data, textStatus, jQxhr) {
				categories[data.id] = data;
				console.log(data);
				fill_categories();
			},

		});
	})
	
});
