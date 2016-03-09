angular
  .module('AngularDoer', [
    'ngRoute',
    'templates'
  ]).config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      });
    $locationProvider.html5Mode(true);
  }).config(function($httpProvider) {
    $httpProvider.defaults.headers.common['Client-Token'] = 'Cwi2R8cYVwPocG4zUmdQxPEDkPcWrXQk'
  });
