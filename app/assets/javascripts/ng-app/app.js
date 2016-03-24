angular
  .module('AngularDoer', [
    'ngRoute',
    'templates',
    'ngSanitize',
    'ui.sortable',
    'ngAnimate'
  ]).config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'todos/index.html',
        controller: 'TodosCtrl'
      });
    $locationProvider.html5Mode(true);
  }).config(function($httpProvider) {
    $httpProvider.defaults.headers.common['Client-Token'] = 'Cwi2R8cYVwPocG4zUmdQxPEDkPcWrXQk'
    $httpProvider.defaults.headers.common['Session-Token'] = Cookies.get('token')
  });
