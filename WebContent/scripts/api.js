'use strict'

var api = {}
api.URL = '/persenk-ultra/api/';

api.aidStations = {
		stationURL : api.URL + 'stations/'
};


api.Runners = {
		runnerURL : api.URL + 'runners/'
};

api.TimeEntries = {
		timeURL : api.URL + 'time/'
};

api.Categories = {
		categoryURL : api.URL + 'categories/'
};

api.aidStations.getAidStations = function(callback) {
	var request = $.ajax({
		url : api.aidStations.stationURL,
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
		url : api.aidStations.stationURL,
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
		url : api.aidStations.stationURL + stationId,
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
		url : api.Runners.runnerURL,
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
		url : api.Runners.runnerURL,
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
		url : api.Runners.runnerURL + runnerId,
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
		url : api.Categories.categoryURL,
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
		url : api.Categories.categoryURL,
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
		url : api.Categories.categoryURL + categoryId,
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

