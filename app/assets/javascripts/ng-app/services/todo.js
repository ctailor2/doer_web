angular.module('AngularDoer')
  .service('TodoService', ['$http', '$q', 'apiConfig', 'Todo', function($http, $q, apiConfig, Todo) {
    return {
      create: function(todo) {
        var deferredHandler = $q.defer();

        $http.post(apiConfig.url() + '/v1/todos/create', { todo: todo }).then(
          function(successResult) {
            var todo = new Todo(successResult.data);
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

        $http.delete(apiConfig.url() + '/v1/todos/' + todo.id).then(
          function(successResult) {
            deferredHandler.resolve();
          },
          function(errorResult) {
            deferredHandler.reject();
          }
        );

        return deferredHandler.promise;
      },
      update: function(todo) {
        var deferredHandler = $q.defer();

        $http.put(apiConfig.url() + '/v1/todos/' + todo.id, { todo: todo }).then(
          function(successResult) {
            deferredHandler.resolve();
          },
          function(errorResult) {
            deferredHandler.reject();
          }
        );

        return deferredHandler.promise;
      },
      bulkUpdate: function(todos) {
        var deferredHandler = $q.defer();

        $http.put(apiConfig.url() + '/v1/todos/bulk_update', { todos_attributes: todos }).then(
          function(successResult) {
            deferredHandler.resolve();
          },
          function(errorResult) {
            deferredHandler.reject();
          }
        );

        return deferredHandler.promise;
      }
    }
  }]);

