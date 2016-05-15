angular.module('AngularDoer')
  .controller('UsersCtrl', function($scope, $http, progressBar, UserService) {
    $scope.progressBar = progressBar;

    $scope.progressBar.start();

    UserService.get({ with_assocs: ['todos'] }).then(
      function(user) {
        $scope.progressBar.complete();
        $scope.user = user;
      },
      function(errorResult) {
        // Should probably pop a login modal here
      }
    );

    var update = function(user) {
      $scope.progressBar.start();

      UserService.update(user).then(
        function() {
          $scope.progressBar.complete();
        },
        function(errorResult) {
        }
      )
    };

    $scope.update = update;

    $scope.changeGoalTarget = function(diff) {
      $scope.user.goal_setting_attributes.target += diff;
      update($scope.user);
    };
  });

