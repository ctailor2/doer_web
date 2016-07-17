angular.module('AngularDoer')
  .factory('progressBar', ['ngProgressFactory', function(ngProgressFactory) {
    var progressBar = ngProgressFactory.createInstance();
    progressBar.setColor('#0275d8');
    return progressBar;
  }]);

