angular.module("app", ["chart.js"]).controller("LineCtrl", function ($scope,$http) {

	
	
	
	$scope.item=[];
	

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
		
		while ($scope.data.length) {
			$scope.data.pop();
		}
		while ($scope.series.length) {
			$scope.series.pop();
		}
		
		angular.forEach($scope.items, function(item, index) {
			$scope.labels.push(item.labels);
			$scope.data.push(item.data);
			$scope.series.push(item.series);
			
		});
	}
  temperature();
	

	
  $scope.labels = [];
  $scope.series = [];
  $scope.data = [];
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