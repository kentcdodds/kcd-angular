angular.module('kcd.directives').directive('kcdRecompile', function($compile, $parse) {
  'use strict';

  return {
    scope: true, // required to be able to clear watchers safely
    compile: function(el) {
      var template = el.html();
      return function link(scope, $el, attrs) {
        scope.$parent.$watch(attrs.kcdRecompile, function(val) {
          if (!val || val === 'false') {
            return;
          }
          // remove all watchers because the recompiled version will set them up again.
          removeChildrenWatchers($el);
          // reset kcdRecompile to false
          $parse(attrs.kcdRecompile).assign(scope.$parent, false);

          // recompile
          var newEl = $compile(template)(scope.$parent.$new());
          $el.html(newEl);
        });
      };
    }
  };

  function removeChildrenWatchers(element) {
    angular.forEach(element.children(), function(childElement) {
      removeAllWatchers(angular.element(childElement));
    });
  }

  function removeAllWatchers(element) {
    if (element.data().hasOwnProperty('$scope')) {
      element.data().$scope.$$watchers = [];
    }
    removeChildrenWatchers(element);
  }
});