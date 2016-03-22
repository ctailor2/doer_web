angular.module('AngularDoer')
  .controller('TodosCtrl', function($scope, $http) {
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
      newTodo = { task: task }
      $http.post('http://localhost:4000/v1/todos/create', { todo: newTodo }).then(
        function(successResult) {
          user.todos.push(successResult.data);
        },
        function(errorResult) {
          // Need to handle the error
        }
      );
    };

    $scope.remove = function(todo) {
      var index = user.todos.indexOf(todo);
      $http.delete('http://localhost:4000/v1/todos/' + todo.id).then(
        function(successResult) {
          user.todos.splice(index, 1);
        },
        function(errorResult) {
          // Need to handle the error
        }
      )
    };
  });

