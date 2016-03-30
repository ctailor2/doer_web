angular.module('AngularDoer')
  .service('UserService', function($http, User) {
    this.get = function() {
      return $http.get('http://localhost:4000/v1/users/show').then(
        function(successResult) {
          return new User(successResult.data);
        },
        function(errorResult) {
        }
      );
    };
  });

