angular.module('AngularDoer')
  .animation('.fade-todo', [function() {
    return {
      leave: function(element, doneFn) {
        $(element).fadeOut(500, doneFn);
      }
    }
  }])
  .controller('TodosCtrl', function($scope, $http, $filter, UserService, TodoService, activeFilter, positionUpdatedFilter) {
    $scope.sortableOptions = {
      axis: 'y',
      containment: 'parent',
      cursor: 'move',
      tolerance: 'pointer',
      stop: function(event, ui) {
        updatePositions(activeFilter($scope.user.todos, false));
      }
    };

    UserService.get().then(
      function(user) {
        $scope.user = user;
      },
      function(errorResult) {
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
      TodoService.create(todo).then(
        function(todo) {
          $scope.task = '';
          $scope.user.todos.push(todo);
          updatePositions(activeFilter($scope.user.todos, false));
        },
        function(errorResult) {
          // Need to handle the error
        }
      );
    };

    $scope.remove = function(todo) {
      TodoService.destroy(todo).then(
        function() {
          var index = $scope.user.todos.indexOf(todo);
          $scope.user.todos.splice(index, 1);
        },
        function(errorResult) {
          // Need to handle the error
        }
      );
    };

    var updatePositions = function(todos) {
      angular.forEach(positionUpdatedFilter(todos), function(todo, index) {
        // Rapid updates are problematic with this approach. Think about
        // what happens when an item is updated and then updated before again
        // before the first update can post to the server
        todo.position = todos.indexOf(todo);
        TodoService.update(todo).then(
          function() {
            // Need to handle the success
          },
          function(errorResult) {
            // Need to handle the error
          }
        );
      });
    };

    $scope.complete = function(todo) {
      TodoService.update(todo).then(
        function() {
          // Need to handle the success
        },
        function(errorResult) {
          // Need to handle the error
        }
      );
    };

    $scope.cancelAdd = function() {
      $scope.user.unallocatedTodos = [];
    };
  });

