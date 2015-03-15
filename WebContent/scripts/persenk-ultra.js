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
	$.each(categories, function() {
		$('.dropdown-menu').append(
				'<li role="presentation"><a role="menuitem" tabindex="-1" href="#">'
						+ this.name + '</a></li>');
	})
}

function add_runner(table, runner) {
	var row = $('<tr/>');
	row.attr('id', runner.id);
	row.append($('<td/>').text(runner.id));
	row.append($('<td/>').text(runner.name));
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
				timeCell.attr('id', runner_id + "-" + this.id);
				timeCell.text(this.time);
				
				timeCell.click(function() {
					alert(timeCell.attr('id'));
				});
				
				row.append(timeCell);
				
			});
			
			table.append(row);
			$('table').trigger('update');
			var sorting = [[0,0]];
			$('table').trigger('sorton',[sorting]);
		}
	});

}

$(document).ready(function() {
	'use strict'

	
	
	
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
			
			$('table').tablesorter({
				widgets: ['zebra']
			});
		}
	});

	
	
	// list all runners
	var tableTimes = $(tableTimesSelector);
	$.ajax({
		type : 'GET',
		url : api + 'runners',
		success : function(runner_array) {
			runner_array.sort(function(a,b) {
				return a.id - b.id;
			});
			$.each(runner_array, function() {
				add_runner(tableTimes, this);
			});
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

	
	
	$('.dropdown-menu li a').click(function() {
		var selText = $(this).text();
		$('#dropdownCategory').html(selText + ' <span class="caret"></span>');
	});
	
	
	
	

});
