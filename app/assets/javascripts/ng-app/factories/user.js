angular.module('AngularDoer')
  .factory('User', function(activeFilter, completedFilter, Todo) {
    var User = function(data) {
      // Default User behavior
      angular.extend(this, {
        unallocatedTodos: [],
        hasTodosToAllocate: function() {
          return this.unallocatedTodos.length > 0;
        },
        maxActive: 2,
        maxedActive: function() {
          return completedFilter(activeFilter(this.todos, true), false).length >= this.maxActive;
        },
        // Not crazy about all this styling living here
        todoHeight: 57,
        todoStyle: function() {
          return { 'height': this.todoHeight + 'px' };
        },
        activeBoxStyle: function() {
          return { 'height': this.maxActive * this.todoHeight + 'px' };
        }
      });
      // Hydrate from API data
      var todos = data.todos.map(function(todo) {
        return new Todo(todo);
      });
      data.todos = todos;
      angular.extend(this, data);
    };
    return User;
  });

