angular.module('AngularDoer')
  .factory('User', function(activeFilter, completedFilter, Todo) {
    var User = function(data) {
      // Default User behavior
      angular.extend(this, {
        unallocatedTodos: [],
        hasTodosToAllocate: function() {
          return this.unallocatedTodos.length > 0;
        },
        maxedActive: function() {
          return completedFilter(activeFilter(this.todos, true), false).length >= this.goal_setting_attributes.target;
        },
        emptyActive: function() {
          return completedFilter(activeFilter(this.todos, true), false).length == 0;
        },
        // Not crazy about all this styling living here
        // Maybe replace ng: :style calls with ng: :class and wrap all this styling
        // in css classes
        progressLabelClass: function() {
          if(this.count_of_todos_completed_today >= this.goal_setting_attributes.target) {
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
          return { 'height': this.goal_setting_attributes.target * this.todoHeight + 'px' };
        },
        progressBarWidth: 625,
        goalIndicatorStyle: function() {
          var leftPosition = this.goal_setting_attributes.target * 1.0 / this.count_of_todos_completed_today * this.progressBarWidth;
          return { 'left': leftPosition + 'px' };
        },
        pullInactiveTodosBtnStyle: function() {
          var topPosition = this.goal_setting_attributes.target * this.todoHeight * 1.0 / 2 - 19;
          return { 'top':  topPosition + 'px' };
        }
      });
      // Hydrate from API data
      // -- assocs
      if(angular.isDefined(data.todos)) {
        var todos = data.todos.map(function(todo) {
          return new Todo(todo);
        });
        data.todos = todos;
      }
      // -- base
      angular.extend(this, data);
    };
    return User;
  });

