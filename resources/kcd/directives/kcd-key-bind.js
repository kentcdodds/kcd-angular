angular.module('kcd.directives').directive('kcdKeyBind', function() {
  'use strict';
  var keyCodes = {
    esc: 27, space: 32, enter: 13, tab: 9,
    backspace: 8, shift: 16, ctrl: 17,
    alt: 18, capslock: 20, numlock: 144
  };

  function map(obj) {
    var mapped = {};
    angular.forEach(obj, function(action, key) {
      if (~~key) {
        mapped[key] = action;
      } else if (keyCodes[key]) {
        mapped[keyCodes[key]] = action;
      } else if (key.length === 1) {
        mapped[key.toUpperCase().charCodeAt(0)] = action;
      }
    });
    return mapped;
  }

  return function(scope, element, attrs) {
    var bindings = map(scope.$eval(attrs.kcdKeyBind));
    element.bind('keyup', function (event) {
      if (bindings.hasOwnProperty(event.which)) {
        scope.$apply(function() {
          scope.$eval(bindings[event.which]);
        });
      }
    });
  };
});