angular.module('AngularDoer')
  .animation('.fade-todo', [function() {
    return {
      leave: function(element, doneFn) {
        $(element).fadeOut(500, doneFn);
      }
    }
  }])
  .controller('TodosCtrl', function($scope, $http, $filter) {
    $scope.sortableOptions = {
      axis: 'y',
      containment: 'parent',
      revert: true,
      cursor: 'move',
      tolerance: 'pointer',
      stop: function(event, ui) {
        updatePositions(user.inactiveTodos);
      }
    };

    var user = {};

    $scope.user = user;

    $http.get('http://localhost:4000/v1/todos/index').then(
      function(successResult) {
        user.activeTodos = $filter('filter')(successResult.data, function(todo, index) {
          return todo.active;
        });
        user.inactiveTodos = $filter('filter')(successResult.data, function(todo, index) {
          return !todo.active;
        });
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
          $scope.task = '';
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

    var updatePositions = function(todos) {
      var updatedTodos = $filter('filter')(todos, function(todo, index) {
        return todo.position != index;
      });
      angular.forEach(updatedTodos, function(todo, index) {
        todo.position = todos.indexOf(todo);
      });
      $http.put('http://localhost:4000/v1/todos/update_positions', { todos_attributes: updatedTodos }).then(
        function(successResult) {
          // Need to handle the success
        },
        function(errorResult) {
          // Need to handle the error
        }
      );
    };

    $scope.uncompletedTodos = function(todo) {
      return !todo.completed;
    };
  });

