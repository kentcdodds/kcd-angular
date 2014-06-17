angular.module('kcd.directives').directive('kcdRecompile', function($compile, $parse) {
  'use strict';
  function getElementAsHtml(el) {
    // http://jsperf.com/jquery-div-vs-span
    return angular.element('<a></a>').append(el.clone()).html();
  }

  return {
    compile: function(el) {
      var template = getElementAsHtml(el);
      return function link(scope, $el, attrs) {
        scope.$watch(attrs.kcdRecompile, function(val) {
          if (!val || val === 'false') {
            return;
          }
          // recompile
          var newEl = $compile(template)(scope);
          $el.replaceWith(newEl);
          $el = newEl;
          // reset kcdRecompile to false
          $parse(attrs.kcdRecompile).assign(scope, false);
        });
      };
    }
  };
});