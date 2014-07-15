angular.module('kcd.site').directive('kcdWatchCount', function() {
  'use strict';
  return {
    link: function(scope, el) {
      function watchCountWatcher() {
        return getWatcherCount(el);
      }
      scope.$watch(watchCountWatcher, function(count) {
        setTimeout(function() {
          scope.$apply(function() {
            el.find('.watch-count-container').text(count || '0');
          });
        },20); // give angular some time to bindonce...
      });

      function getWatcherCount(root) {
        root = angular.element(root || document.documentElement);
        var watcherCount = 0;

        function getWatchers(element) {
          if (element.data().hasOwnProperty('$scope')) {
            var watchers = element.data().$scope.$$watchers || [];
            watcherCount += watchers.length;
            var isKcdWatchCountWatcher = watchers.some(function(watcher) {
              return watcher.exp === watchCountWatcher;
            });
            if (isKcdWatchCountWatcher) {
              watcherCount = watcherCount - 1;
            }
          }
          angular.forEach(element.children(), function (childElement) {
            getWatchers(angular.element(childElement));
          });
        }

        getWatchers(root);

        return watcherCount;
      }
    }
  };
});