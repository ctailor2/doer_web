angular.module('AngularDoer')
  .service('UserService', function($http, $q, apiConfig, User) {
    return {
      get: function(params) {
        var deferredHandler = $q.defer();

        $http.get(apiConfig.url() + '/v1/users/show', { params: params }).then(
          function(successResult) {
            var user = new User(successResult.data);
            deferredHandler.resolve(user);
          },
          function(errorResult) {
            // Need to handle the error
          }
        );

        return deferredHandler.promise;
      },
      update: function(user) {
        var deferredHandler = $q.defer();

        $http.put(apiConfig.url() + '/v1/users/update', { user: user }).then(
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

