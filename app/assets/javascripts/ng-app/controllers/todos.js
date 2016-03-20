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
      user.todos.push(newTodo);
      $http.post('http://localhost:4000/v1/todos/create', { todo: newTodo }).then(
        function(successResult) {
          newTodo.id = successResult.data.id;
        },
        function(errorResult) {
          // Need to handle the error
        }
      );
    };

    $scope.persistedHTML = function(id) {
      if(id) {
        return '<span class="octicon octicon-x"></span>';
      } else {
        return '<img src="ajax-loader.gif"/>';
      }
    };
  });

