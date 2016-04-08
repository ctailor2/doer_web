angular.module('AngularDoer')
  .controller('UsersCtrl', function($scope, $http, UserService) {
    UserService.get().then(
      function(user) {
        $scope.user = user;
      },
      function(errorResult) {
        // Should probably pop a login modal here
      }
    );
  });

