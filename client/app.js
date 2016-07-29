angular.module('MyApp', [])
  .controller('MainController', ['$http', '$scope', function($http, $scope) {
    console.log('MainController loaded');

    $scope.message = "Get Sequence!";
    $scope.working = false;
    $scope.get = function() {
      $scope.message = "Processing...(may take 30s~)";
      var start = Date.now();
      $scope.working = true;
      $http({
          method: 'GET',
          url: '/test'
        }).then(function(data) {
          $scope.working = false;
          $scope.result = data.data;
          $scope.message = "Completed in " + (Date.now() - start) / 1000 + "seconds";
        });
    }

    $scope.result = "";
  }]);
