angular.module('AngularDoer')
  .controller('UsersCtrl', function($scope, $http, progressBar, UserService) {
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

    $scope.update = function(user) {
      $scope.progressBar.start();

      UserService.update(user).then(
        function() {
          $scope.progressBar.complete();
        },
        function(errorResult) {
        }
      )
    };
  });

