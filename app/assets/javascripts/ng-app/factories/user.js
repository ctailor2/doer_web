angular.module('AngularDoer')
  .factory('User', function($filter) {
    var User = function(data) {
      // Default User behavior
      angular.extend(this, {
        unallocatedTodos: [],
        hasTodosToAllocate: function() {
          return this.unallocatedTodos.length > 0;
        },
        maxActive: 2,
        activeBoxStyle: function() {
          return { 'height': this.maxActive * 50 + 'px' };
        }
      });
      // Hydrate from API data
      angular.extend(this, data);
    };
    return User;
  });

