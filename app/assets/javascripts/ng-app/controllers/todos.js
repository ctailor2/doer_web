angular.module('AngularDoer')
  .animation('.fade-todo', [function() {
    return {
      leave: function(element, doneFn) {
        $(element).fadeOut(500, doneFn);
      }
    }
  }])
  .controller('TodosCtrl', function($scope, $http, $filter, UserService) {
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

    var user = UserService.get();
    $scope.user = user;

    $http.get('http://localhost:4000/v1/todos/index').then(
      function(successResult) {
        // Should probably consolidate grabbing the user and todos into one api call
        // Maybe develop a user service or model that has this behavior
        $scope.user.activeTodos = $filter('filter')(successResult.data, function(todo, index) {
          return todo.active;
        });
        $scope.user.inactiveTodos = $filter('filter')(successResult.data, function(todo, index) {
          return !todo.active;
        });
      },
      function(errorResult) {
        // Need to handle the error
      }
    );

    $scope.add = function(task) {
      $scope.user.unallocatedTodos.push({ task: task });
    };

    $scope.doNow = function() {
      var todo = $scope.user.unallocatedTodos.splice(0, 1)[0];
      todo.active = true;
      create(todo);
    };

    $scope.doLater = function() {
      var todo = $scope.user.unallocatedTodos.splice(0, 1)[0];
      todo.active = false;
      create(todo);
    };

    var create = function(todo) {
      $http.post('http://localhost:4000/v1/todos/create', { todo: todo }).then(
        function(successResult) {
          $scope.task = '';
          if(todo.active) {
            $scope.user.activeTodos.push(successResult.data);
          } else {
            $scope.user.inactiveTodos.push(successResult.data);
            updatePositions($scope.user.inactiveTodos);
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
            var index = $scope.user.activeTodos.indexOf(todo);
            $scope.user.activeTodos.splice(index, 1);
          } else {
            var index = $scope.user.inactiveTodos.indexOf(todo);
            $scope.user.inactiveTodos.splice(index, 1);
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
      $scope.user.unallocatedTodos = [];
    };
  });

