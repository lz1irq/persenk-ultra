'use strict'

var apiURL = '/persenk-ultra/api/';
var aidStationURL = apiURL + 'stations/';
var runnerURL = apiURL + 'runners/'
var timeURL = apiURL + 'time/';
var categoryURL = apiURL + 'categories/';

var api = {}
api.aidStations = {};
api.Runners = {};
api.TimeEntries = {};
api.Categories = {};

api.aidStations.getAidStations = function(callback) {
	var request = $.ajax({
		url : aidStationURL,
		method : 'GET',
		dataType : "json",
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
				callback(data);
			}
		}
	});
}

api.aidStations.createAidStation = function(aidStation, callback) {
	var request = $.ajax({
		url : aidStationURL,
		method : 'POST',
		dataType : 'json',
		data : JSON.stringify(aidStation),
		headers: { 
	        'Accept': 'application/json',
	        'Content-Type': 'application/json' 
	    },
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
				callback(data);
			}
		}
	});
}

api.aidStations.deleteAidStation = function(stationId, callback) {
	var request = $.ajax({
		url : aidStationURL + stationId,
		method : 'DELETE',
		headers: { 
	        'Accept': 'application/json',
	        'Content-Type': 'application/json' 
	    },
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
				callback(data);
			}
		}
	});	
}

api.Runners.getRunners = function(callback) {
	var request = $.ajax({
		url : runnerURL,
		method : 'GET',
		dataType : "json",
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
				callback(data);
			}
		}
	});
}

api.Runners.createRunner = function(runner, callback) {
	var request = $.ajax({
		url : runnerURL,
		method : 'POST',
		dataType : 'json',
		data : JSON.stringify(runner),
		headers: { 
	        'Accept': 'application/json',
	        'Content-Type': 'application/json' 
	    },
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
				callback(data);
			}
		}
	});	
}

api.Runners.deleteRunner = function(runnerId, callback) {
	var request = $.ajax({
		url : runnerURL + runnerId,
		method : 'DELETE',
		headers: { 
	        'Accept': 'application/json',
	        'Content-Type': 'application/json' 
	    },
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
				callback(data);
			}
		}
	});	
}

api.TimeEntries.getTimeEntries = function(callback) {
	var request = $.ajax({
		url : timeURL,
		method : 'GET',
		dataType : "json",
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
				callback(data);
			}
		}
	});
}

api.Categories.getCategories = function(callback) {
	var request = $.ajax({
		url : categoryURL,
		method : 'GET',
		dataType : "json",
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
				callback(data);
			}
		}
	});	
}

api.Categories.createCategory = function(newCategory, callback) {
	var request = $.ajax({
		url : categoryURL,
		method : 'POST',
		dataType : 'json',
		data : JSON.stringify(newCategory),
		headers: { 
	        'Accept': 'application/json',
	        'Content-Type': 'application/json' 
	    },
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
				callback(data);
			}
		}
	});	
}

api.Categories.deleteCategory = function(categoryId, callback) {
	var request = $.ajax({
		url : categoryURL + categoryId,
		method : 'DELETE',
		headers: { 
	        'Accept': 'application/json',
	        'Content-Type': 'application/json' 
	    },
		success : function(data, status, jqXHR) {
			if (callback !== undefined) {
				callback(data);
			}
		}
	});	
};

