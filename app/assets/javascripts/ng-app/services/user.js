angular.module('AngularDoer')
  .service('UserService', function($http, $q, User) {
    var deferredHandler;

    return {
      get: function() {
        deferredHandler = deferredHandler || $q.defer();

        $http.get('http://localhost:4000/v1/users/show').then(
          function(successResult) {
            var user = new User(successResult.data);
            deferredHandler.resolve(user);
          },
          function(errorResult) {
            // Need to handle the error
          }
        );

        return deferredHandler.promise;
      }
    }
  });

