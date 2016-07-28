angular.module('MyApp', [])
  .controller('MainController', ['$http', '$scope', function($http, $scope) {
    console.log('MainController loaded');

    $scope.message = "May take 15-20 seconds."
    $scope.working = false;
    $scope.get = function() {
      $scope.working = true;
      $http({
          method: 'GET',
          url: '/test'
        }).then(function(data) {
          $scope.working = false;
          console.log(data.data);
        });
    }

  }]);
