angular
  .module('AngularDoer', [
    'ngRoute',
    'templates',
    'ngSanitize',
    'ui.sortable',
    'ngAnimate',
    'ngProgress'
  ]).config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  }).config(function($httpProvider) {
    $httpProvider.defaults.headers.common['Client-Token'] = 'Cwi2R8cYVwPocG4zUmdQxPEDkPcWrXQk'
    $httpProvider.defaults.headers.common['Session-Token'] = Cookies.get('token')
  });
