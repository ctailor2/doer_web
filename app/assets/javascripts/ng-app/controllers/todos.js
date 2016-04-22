angular.module('AngularDoer')
  .controller('TodosCtrl', function($scope, $http, $filter, progressBar, UserService, TodoService, activeFilter, positionUpdatedFilter) {
    $scope.sortableOptions = {
      // Still need to test how sorting around a disabled item works
      items: '> li:not(.disabled)',
      axis: 'y',
      containment: 'parent',
      cursor: 'move',
      tolerance: 'pointer',
      stop: function(event, ui) {
        updatePositions(activeFilter($scope.user.todos, false));
      }
    };

    $scope.progressBar = progressBar;

    $scope.progressBar.start();

    UserService.get().then(
      function(user) {
        $scope.progressBar.complete();
        $scope.user = user;
      },
      function(errorResult) {
        // Should probably pop a login modal here
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
      $scope.progressBar.start();

      TodoService.create(todo).then(
        function(todo) {
          $scope.progressBar.complete();
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
      var index = $scope.user.todos.indexOf(todo);
      $scope.user.todos.splice(index, 1);
      $scope.progressBar.start();

      TodoService.destroy(todo).then(
        function() {
          $scope.progressBar.complete();
        },
        function(errorResult) {
          $scope.user.todos.splice(index, 0, todo);
        }
      );
    };

    var updatePositions = function(todos) {
      angular.forEach(positionUpdatedFilter(todos), function(todo, index) {
        todo.position = todos.indexOf(todo);
        todo.toggleSort(false);
        $scope.progressBar.start();

        TodoService.update(todo).then(
          function() {
            // Need to handle the success
            todo.toggleSort(true);
            $scope.progressBar.complete();
          },
          function() {
            // Need to handle the error
            // Maybe make a copy of the object before the request in case it needs
            // to be put back
            // This one is tricky to reverse since there will be multiple requests
            // out at the same time that are being processed at the same time.
            // Maybe this is enough to warrant a bulk update action?
          }
        );
      });
    };

    $scope.complete = function(todo) {
      $scope.progressBar.start();

      TodoService.update(todo).then(
        function() {
          $scope.progressBar.complete();
          $scope.user.completed += 1;
        },
        function() {
          todo.completed = !todo.completed;
        }
      );
    };

    $scope.cancelAdd = function() {
      $scope.user.unallocatedTodos = [];
    };

    $scope.makeInactive = function(todo) {
      todo.active = false;
      $scope.user.todos.moveToFront(todo);
      updatePositions(activeFilter($scope.user.todos, false));
    };
  });

