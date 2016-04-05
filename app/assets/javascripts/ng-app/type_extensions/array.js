angular.module('AngularDoer')
  .run(function() {
    // What file should this extension of array behavior belong in?
    Array.prototype.moveToFront = function(element) {
      var index = this.indexOf(element);
      var removedElement = this.splice(index, 1)[0];
      this.splice(0, 0, removedElement);
    };
  });

