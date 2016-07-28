angular.module('MyApp', [])
  .controller('MainController', ['$http', '$scope', function($http, $scope) {
    console.log('MainController loaded');
    $scope.message = 'Please choose a text file.';

    // TODO: move to factory
    $scope.post = function() {
      if ($scope.file) {
        // if string is not empty
        $http({
          method: 'POST',
          url: '/endpoint',
          data: {
            file: $scope.file
          }
        }).then(function(data) {
          $scope.message = '"' + $scope.text + '" has been searched ' + data.data[0] + ' times and occurs ' + data.data[1] + ' times in the source text files.';
          $scope.count = data.data;
          $scope.getAllData();
        });
      } else {
        $scope.message = "Please choose a .txt file.";
      }
    };

  }]);
