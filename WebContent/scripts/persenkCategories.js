persenkUltraServices.factory('CategoryFactory', [ '$http', function($http) {
	
	var categoryURL = apiURL + 'categories/';
	
	this.getCategories = function() {
		return $http.get(categoryURL);
	};
	
	this.deleteCategory = function(categoryId) {
		return $http.delete(categoryURL + categoryId);
	};
	
	this.createCategory = function(category) {
		return $http.post(categoryURL, category);
	}
	
	this.updateCategory = function(category) {
		return $http.put(categoryURL + category.id, category);
	}

	return this;
} ]);

persenkUltra.controller('CategoryController', [ '$scope', 'CategoryFactory', function($scope, CategoryFactory) {

	$scope.categories = [];
			
	$scope.getCategories = function() {
		CategoryFactory.getCategories().success(function(categories) {
			$scope.categories = categories;
		}).error(function(errorMessage) {
			console.log(errorMessage);
		});
	}
	
	$scope.deleteCategory = function(categoryId) {
		for(var index=0;index < $scope.categories.length;index++) {
			if($scope.categories[index].id === categoryId) {
				$scope.categories.splice(index, 1);
				break;
			}
		}
		CategoryFactory.deleteCategory(categoryId);
	}
	
	$scope.createCategory = function(category) {
		CategoryFactory.createCategory(category).success(function(newStation) {
			$scope.categories.push(category);

		}).error(function(errorMessage) {
			console.log(errorMessage);
		});
	}
	
	$scope.updateCategory = function(category) {
		CategoryFactory.updateCategory(category);
	}

	$scope.getCategories();

} ]);