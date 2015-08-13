angular.module('kcd.directives').directive('kcdAutofocus', function($timeout, $document) {
  'use strict';
  return {
    link: function(scope, element, attrs) {
      var previousEl = null;
      var el = element[0];
      var doc = $document[0];
      attrs.$observe('kcdAutofocus', function(value) {
        if(value && value !== 'false') {
          $timeout(function() {
            previousEl = doc.activeElement;
            el.focus();
          }, ~~attrs.focusWait);
        } else {
          if (previousEl && attrs.hasOwnProperty('refocus') && doc.activeElement === el) {
            el.blur();
            previousEl.focus();
          }
        }
      });
    }
  };
});
