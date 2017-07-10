var app = angular.module('app',[]);

app.filter('ceil', function() {
	return function(input) {
		return Math.ceil(input);
	};
});

app.controller('controller', function ($scope, $http) {

	var empty = {};

	$scope.selected = false;
	$scope.creating = false;
	$scope.updating = false;

	$scope.item = {};
	$scope.breweries = [];
	$scope.size = 0;
	$scope.offset = 0;
	$scope.length = 5;

	var init = function() {
		$scope.selected = false;
		$scope.creating = false;
		$scope.updating = false;
		$scope.item = angular.copy(empty);
	}

	$scope.clean = function() {
		init();
	}

	$scope.select = function(item) {
		if (item) {
			$scope.creating = false;
			$scope.updating = true;
			$scope.item = angular.copy(item);
		} else {
			$scope.creating = true;
			$scope.updating = false;  			
			$scope.item = angular.copy(empty);
		}
		$scope.selected = true;
	}

	$scope.create = function() {
		var datacontent = "name=" + $scope.item.ID_capteur + "&city=" + $scope.item.Description ; 
		$http({method:'POST',url:'./breweries/create',data:datacontent,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
		.then(function onSuccess(response) {
			init();
			size();
			$scope.offset = 0;
			page();
		}, function onError(response) {

		}); 
	}

	$scope.update = function() {
		var datacontent = "&name=" + $scope.item.ID_capteur + "&city=" + $scope.item.Description; 
		$http({method:'POST',url:'./breweries/update',data:datacontent,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
		.then(function onSuccess(response) {
			init();
			page();
		}, function onError(response) {

		}); 
	}

	$scope.remove = function() {
		var datacontent = "&name=" + $scope.item.ID_capteur; 
		$http({method:'POST',url:'./breweries/delete',data:datacontent,headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
		.then(function onSuccess(response) {
			init();
			size();
			$scope.offset = 0;
			page();
		}, function onError(response) {

		}); 
	}

	var size = function() {
		$http({method:'GET',url:'./breweries/size'})
		.then(function onSuccess(response) {
			$scope.size = response.data;
		}, function onError(response) {
			$scope.size = 0;
		});  			
	}

	var page = function() {
		$http({method:'GET',url:'./breweries/page',params:{"offset":$scope.offset,"length":$scope.length}})
		.then(function onSuccess(response) {
			$scope.breweries = response.data;
		}, function onError(response) {
			$scope.breweries = [];
		});
	}

	$scope.prev = function() {
		if ($scope.length <= $scope.offset) {
			$scope.offset = $scope.offset - $scope.length;
			page();
		}
	}

	$scope.next = function() {
		if ($scope.offset + $scope.length < $scope.size) {
			$scope.offset = $scope.offset + $scope.length;
			page();			
		}
	}

	$scope.first = function() {
		$scope.offset = 0;
		page();
	}

	$scope.last = function() {
		$scope.offset = Math.floor(($scope.size - 1) / $scope.length) * $scope.length;
		page();
	}

	init();
	size();
	page();

});