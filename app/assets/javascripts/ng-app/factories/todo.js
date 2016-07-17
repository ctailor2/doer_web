angular.module('AngularDoer')
  .factory('Todo', [function() {
    var Todo = function(data) {
      angular.extend(this, {
        sortableClass: '',
        toggleSort: function(enabled) {
          if(enabled) {
            this.sortableClass = '';
          } else {
            this.sortableClass = 'disabled';
          }
        }
      });
      angular.extend(this, data);
    };
    return Todo;
  }]);

