angular.module('AngularDoer')
  .service('TodoService', function($http, $q) {
    return {
      create: function(todo) {
        var deferredHandler = $q.defer();

        $http.post('http://localhost:4000/v1/todos/create', { todo: todo }).then(
          function(successResult) {
            var todo = successResult.data;
            deferredHandler.resolve(todo);
          },
          function(errorResult) {
            // Need to handle the error
          }
        );

        return deferredHandler.promise;
      },
      destroy: function(todo) {
        var deferredHandler = $q.defer();

        $http.delete('http://localhost:4000/v1/todos/' + todo.id).then(
          function(successResult) {
            deferredHandler.resolve();
          },
          function(errorResult) {
            // Need to handle the error
          }
        );

        return deferredHandler.promise;
      },
      update: function(todo) {
        var deferredHandler = $q.defer();

        $http.put('http://localhost:4000/v1/todos/' + todo.id, { todo: todo }).then(
          function(successResult) {
            deferredHandler.resolve();
          },
          function(errorResult) {
            // Need to handle the error
          }
        );

        return deferredHandler.promise;
      }
    }
  });

