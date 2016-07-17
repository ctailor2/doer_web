angular.module('AngularDoer')
  .filter('active', [function() {
    return function(todos, active) {
      var filteredTodos = [];
      angular.forEach(todos, function(todo) {
        if(todo.active == active) {
          filteredTodos.push(todo);
        }
      });
      return filteredTodos;
    };
  }])
  .filter('completed', [function() {
    return function(todos, completed) {
      var filteredTodos = [];
      angular.forEach(todos, function(todo) {
        if(todo.completed == completed) {
          filteredTodos.push(todo);
        }
      });
      return filteredTodos;
    };
  }])
  .filter('positionUpdated', [function() {
    return function(todos) {
      var filteredTodos = [];
      angular.forEach(todos, function(todo) {
        if(todo.position != todos.indexOf(todo)) {
          filteredTodos.push(todo);
        }
      });
      return filteredTodos;
    };
  }])

