angular.module('AngularDoer')
  .controller('HomeCtrl', function($scope, $http) {
    var user = {};

    $scope.user = user;

    $http.get('http://localhost:4000/v1/todos/index').then(
      function(successResult) {
        user.todos = successResult.data;
      },
      function(errorResult) {
        // Need to handle the error
      }
    );

    $scope.add = function(task) {
      //$scope.user.todos.push({ task: task });
      //$http.post('http://localhost:4000/v1/todos/create', { todo: todo });
    };
  });

