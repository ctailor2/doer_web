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
        emptyActive: function() {
          return completedFilter(activeFilter(this.todos, true), false).length == 0;
        },
        // Not crazy about all this styling living here
        // Maybe replace ng: :style calls with ng: :class and wrap all this styling
        // in css classes
        progressLabelClass: function() {
          if(this.completed >= this.maxActive) {
            return 'label-success'
          } else {
            return 'label-primary'
          }
        },
        todoHeight: 57,
        todoStyle: function() {
          return { 'height': this.todoHeight + 'px' };
        },
        activeBoxStyle: function() {
          return { 'height': this.maxActive * this.todoHeight + 'px' };
        },
        progressBarWidth: 625,
        goalIndicatorStyle: function() {
          var leftPosition = this.maxActive * 1.0 / this.completed * this.progressBarWidth;
          return { 'left': leftPosition + 'px' };
        },
        pullInactiveTodosBtnStyle: function() {
          var topPosition = this.maxActive * this.todoHeight * 1.0 / 2 - 19;
          return { 'top':  topPosition + 'px' };
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

