angular.module('kcd.site').directive('kcdWatchCount', function() {
  'use strict';
  return {
    link: function(scope, el) {
      var wachCountContainer = el.find('.watch-count-container');
      wachCountContainer.on('click', function(count) {
        scope.$apply(function() {
          el.find('.watch-count-container').text(getWatcherCount(el) || '0');
        });
      });

      setTimeout(function() {
        wachCountContainer.click();
      }, 20); // get angular time to bindonce...

      function getWatcherCount(root) {
        root = angular.element(root || document.documentElement);
        var watcherCount = 0;

        function getWatchers(element) {
          var isolateWatchers = getWatchersFromScope(element.data().$isolateScope);
          var scopeWatchers = getWatchersFromScope(element.data().$scope);
          var watchers = scopeWatchers.concat(isolateWatchers);
          watcherCount += watchers.length;
          var isKcdWatchCountWatcher = watchers.some(function(watcher) {
            return watcher.exp === watchCountWatcher;
          });
          if (isKcdWatchCountWatcher) {
            watcherCount = watcherCount - 1;
          }
          angular.forEach(element.children(), function (childElement) {
            getWatchers(angular.element(childElement));
          });
        }

        getWatchers(root);

        return watcherCount;
      }

      function getWatchersFromScope(scope) {
        return scope && scope.$$watchers ? scope.$$watchers : [];
      }
    }
  };
});