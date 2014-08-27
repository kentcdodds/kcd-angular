angular.module('kcd.directives').directive('kcdHighlightCode', function(hljs, $timeout) {
  'use strict';
  return function kcdHighlightCode(scope, el) {
    var maxAttempts = 20;
    var totalAttempts = 0;
    function waitOnHighlight() {
      if (totalAttempts > maxAttempts) {
        return;
      }
      $timeout(function() {
        totalAttempts++;
        !attemptHighlight() && waitOnHighlight();
      }, 1);
    }
    function attemptHighlight() {
      var codeEls = el[0].querySelectorAll('pre code');
      if (codeEls && codeEls.length) {
        angular.forEach(codeEls, function(codeEl) {
          hljs.highlightBlock(codeEl);
        });
        return true;
      } else {
        return false;
      }
    }
    !attemptHighlight() && waitOnHighlight();
  };
});