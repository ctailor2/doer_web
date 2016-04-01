angular.module('AngularDoer')
  .animation('.fade-todo', [function() {
    return {
      leave: function(element, doneFn) {
        $(element).fadeOut(500, doneFn);
      }
    }
  }])
  .filter('active', function() {
    return function(todos, active) {
      var filteredTodos = [];
      angular.forEach(todos, function(todo) {
        if(todo.active == active) {
          filteredTodos.push(todo);
        }
      });
      return filteredTodos;
    };
  })
  .filter('completed', function() {
    return function(todos, completed) {
      var filteredTodos = [];
      angular.forEach(todos, function(todo) {
        if(todo.completed == completed) {
          filteredTodos.push(todo);
        }
      });
      return filteredTodos;
    };
  })
  .filter('positionUpdated', function() {
    return function(todos) {
      var filteredTodos = [];
      angular.forEach(todos, function(todo) {
        if(todo.position != todos.indexOf(todo)) {
          filteredTodos.push(todo);
        }
      });
      return filteredTodos;
    };
  })
  .controller('TodosCtrl', function($scope, $http, $filter, UserService, TodoService, activeFilter, positionUpdatedFilter) {
    $scope.sortableOptions = {
      axis: 'y',
      containment: 'parent',
      revert: true,
      cursor: 'move',
      tolerance: 'pointer',
      stop: function(event, ui) {
        updatePositions(positionUpdatedFilter(activeFilter($scope.user.todos, false)));
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
          updatePositions(positionUpdatedFilter(activeFilter($scope.user.todos, false)));
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
      angular.forEach(todos, function(todo, index) {
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

