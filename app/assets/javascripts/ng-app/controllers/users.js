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
      $scope.user.goal_setting_attributes['updated_today?'] = true;
      update($scope.user);
    };

    $scope.nextGoalTargetUpdateText = function() {
      if(angular.isDefined($scope.user) && $scope.user.goal_setting_attributes['updated_today?']) {
        return "Next update allowed " + moment().endOf('day').fromNow() + ".";
      } else {
        return "";
      };
    };
  });

