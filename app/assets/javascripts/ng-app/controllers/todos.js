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

    var user = {
      unallocatedTodos: [],
      hasTodosToAllocate: function() {
        return this.unallocatedTodos.length > 0;
      }
    };

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
      user.unallocatedTodos.push({ task: task });
    };

    $scope.doNow = function() {
      var todo = user.unallocatedTodos.splice(0, 1)[0];
      todo.active = true;
      create(todo);
    };

    $scope.doLater = function() {
      var todo = user.unallocatedTodos.splice(0, 1)[0];
      todo.active = false;
      create(todo);
    };

    var create = function(todo) {
      $http.post('http://localhost:4000/v1/todos/create', { todo: todo }).then(
        function(successResult) {
          $scope.task = '';
          if(todo.active) {
            user.activeTodos.push(successResult.data);
          } else {
            user.inactiveTodos.push(successResult.data);
            updatePositions(user.inactiveTodos);
          }
        },
        function(errorResult) {
          // Need to handle the error
        }
      );
    };

    $scope.remove = function(todo) {
      $http.delete('http://localhost:4000/v1/todos/' + todo.id).then(
        function(successResult) {
          if(todo.active) {
            var index = user.activeTodos.indexOf(todo);
            user.activeTodos.splice(index, 1);
          } else {
            var index = user.inactiveTodos.indexOf(todo);
            user.inactiveTodos.splice(index, 1);
          }
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

    $scope.cancelAdd = function() {
      user.unallocatedTodos = [];
    };
  });

