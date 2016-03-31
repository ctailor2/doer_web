angular.module('AngularDoer')
  .service('TodoService', function($http, $q) {
    var deferredHandler;

    return {
      create: function(todo) {
        deferredHandler = deferredHandler || $q.defer();

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
        deferredHandler = deferredHandler || $q.defer();

        $http.delete('http://localhost:4000/v1/todos/' + todo.id).then(
          function(successResult) {
            var todo = successResult.data;
            deferredHandler.resolve(todo);
          },
          function(errorResult) {
            // Need to handle the error
          }
        );

        return deferredHandler.promise;
      }
    }
  });

