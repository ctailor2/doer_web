angular.module('AngularDoer')
  .controller('UsersCtrl', function($scope, $http, progressBar, UserService) {
    $scope.progressBar = progressBar;

    $scope.progressBar.start();

    UserService.get({ 'with_assocs[]': ['goal_setting'] }).then(
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

    $scope.cannotChangeGoalTarget = function(diff) {
      if(angular.isDefined($scope.user)) {
        return ($scope.user.goal_setting_attributes['updated_today?'] || $scope.user.goal_setting_attributes.target + diff < $scope.user.count_of_active_todos);
      } else {
        return false;
      };
    }

    $scope.nextGoalTargetUpdateText = function() {
      if(this.cannotChangeGoalTarget(1)) {
        return "Next update allowed " + moment().endOf('day').fromNow() + ".";
      } else {
        return "";
      };
    };
  });

