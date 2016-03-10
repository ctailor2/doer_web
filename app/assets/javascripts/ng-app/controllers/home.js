angular.module('AngularDoer')
  .controller('HomeCtrl', function($scope, $http) {
    $http.get('http://localhost:4000/v1/todos/index', {
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

    $scope.add = function(todo) {
      $http.post('http://localhost:4000/v1/todos/create', { todo: todo }, {
        headers: {
          'Session-Token': Cookies.get('token')
        }
      });
    };
  });

