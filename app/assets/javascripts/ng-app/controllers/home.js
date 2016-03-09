angular.module('AngularDoer')
  .controller('HomeCtrl', function($scope, $http) {
    $http.get('http://localhost:4000/v1/todos/index', {
      method: 'GET',
      headers: {
        'Session-Token': Cookies.get('token')
      }
    }).
    then(
      function(successResult) {
        $scope.todos = successResult.data
      },
      function(errorResult) {
        // Need to handle the error
      }
    );
  });

