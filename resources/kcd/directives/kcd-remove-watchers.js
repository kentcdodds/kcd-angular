angular.module('kcd.directives').directive('kcdRemoveWatchers', function($parse, _) {
  'use strict';
  return {
    scope: {
      saveExpressions: '='
    },
    link: function kcdRemoveWatchersLink(scope, el, attrs) {
      setTimeout(function() {
        removeWatchers(el, scope.saveExpressions);
      });
    }
  };

  function removeWatchers(element, saveExpressions) {
    removeWatchersFromScope(element.data().$isolateScope, saveExpressions);
    removeWatchersFromScope(element.data().$scope, saveExpressions);
    angular.forEach(element.children(), function (childElement) {
      removeWatchers(angular.element(childElement), saveExpressions);
    });
  }

  function removeWatchersFromScope(scope, saveExpressions) {
    if (!scope) {
      return;
    }
    _.remove(scope.$$watchers, function(watcher) {
      return !_.contains(saveExpressions, watcher.exp);
    });
    scope.$$watchers = scope.$$watchers || [];
  }
});