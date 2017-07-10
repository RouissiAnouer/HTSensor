var app = angular.module('app',["chart.js"]);

app.filter('ceil', function() {
	return function(input) {
		return Math.ceil(input);
	};
});

app.controller('LineCtrl', function ($scope, $http) {

	
	var empty = {};

	$scope.selected = false;
	$scope.creating = false;
	$scope.updating = false;

	$scope.valeur = {};
	$scope.breweries = [];
	$scope.size = 0;
	$scope.offset = 0;
	$scope.length = 5;

	var init = function() {
		$scope.selected = false;
		$scope.updating = false;
		$scope.valeur = angular.copy(empty);
	}

	$scope.clean = function() {
		init();
	}

	$scope.select = function(item) {
		if (item) {
			$scope.updating = true;
			$scope.valeur = angular.copy(item.ID_capteur);
			humidite();
			temperature();
		} else {

			$scope.updating = false;  			
			$scope.valeur = angular.copy(empty);
		}
		$scope.selected = true;
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

	
	
	
	$scope.item=[];
	$scope.humid=[];
	
	var humidite = function() {
		$http({method:'GET',url:'./statsHumid',params:{"name":$scope.valeur}})
		.then(function onSuccess(response) {
			$scope.humids = response.data;
			processhumid();
		}, function onError(response) {
			$scope.humids = [];
		});  			
	}
	
	
	
 
  var processhumid = function() {
		while ($scope.labels.length) { 
			$scope.labels.pop();
		}
		
		while ($scope.data2.length) {
			$scope.data2.pop();
		}
		/*while ($scope.series.length) {
			$scope.series.pop();
		}*/
		
		angular.forEach($scope.humids, function(humid, index) {
			$scope.labels.push(humid.labels);
			$scope.data2.push(humid.data);
			
			
		});
	}
 
	

	var temperature = function() {
		$http({method:'GET',url:'./statsCapteur',params:{"name":$scope.valeur}})
		.then(function onSuccess(response) {
			$scope.items = response.data;
			process();
		}, function onError(response) {
			$scope.items = [];
		});  			
	}
	
	 
	
 
  var process = function() {
		while ($scope.labels.length) { 
			$scope.labels.pop();
		}
		
		while ($scope.data1.length) {
			$scope.data1.pop();
		}
		/*while ($scope.series.length) {
			$scope.series.pop();
		}*/
		
		
		
		angular.forEach($scope.items, function(item, index) {
			
			$scope.labels.push(item.labels);
			$scope.data1.push(item.data);
			
		
		});
	}
		
  
  
    $scope.data1=[];
	$scope.data2=[];
	$scope.series1=['Température'];
	$scope.series2=['Humidité'];
   
	

  $scope.data = [$scope.data1,$scope.data2];
  $scope.labels = [];
  $scope.series = [$scope.series1,$scope.series2];
  
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };
	  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
	  $scope.options = {
	    scales: {
	      yAxes: [
	        {
	          id: 'y-axis-1',
	          type: 'linear',
	          display: true,
	          position: 'left'
	        }
	        
	      ]
	    }
	  };
	 
  
  
  

});