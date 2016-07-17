angular
  .module('AngularDoer', [
    'ngRoute',
    'templates',
    'ngSanitize',
    'ui.sortable',
    'ngAnimate',
    'ngProgress'
  ])
  .constant('apiConfig', {
    'host': 'http://localhost',
    'port': '4000',
    'url': function() {
      return [this.host, this.port].join(':');
    }
  })
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
  }])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['Client-Token'] = 'Cwi2R8cYVwPocG4zUmdQxPEDkPcWrXQk'
    $httpProvider.defaults.headers.common['Session-Token'] = Cookies.get('token')
  }]);
