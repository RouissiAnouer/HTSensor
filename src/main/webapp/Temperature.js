angular.module("app", ["chart.js"]).controller("LineCtrl", function ($scope,$http) {

	
	
	
	$scope.item=[];
	$scope.humid=[];
	
	var humidite = function() {
		$http({method:'GET',url:'./statsLocal'})
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
  humidite();
	

	var temperature = function() {
		$http({method:'GET',url:'./statsGlobal'})
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
		
  temperature();
  
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