angular.module('kcd.directives').directive('kcdNgStats', function($rootScope) {
  'use strict';
  var waitTime = 200;
  // define the timer function to use based upon whether or not 'performance is available'
  var timerNow = window.performance ? function() { return performance.now(); } : function() { return Date.now(); };

  return {
    link: function(scope, el, attrs) {
      var lastRun = {
        watchCount: 0,
        digestLength: 0
      };
      scope.ngStats = {
        watchCount: 0
      };


      if (attrs.hasOwnProperty('watchCount')) {
        setupWatchCount();
      }
      if (attrs.hasOwnProperty('digestLength')) {
        setupDigestLength();
      }

      function setupWatchCount() {
        var watchCountRoot;
        if (attrs.watchCountRoot) {
          if (attrs.watchCountRoot === 'this') {
            watchCountRoot = el;
          } else {
            watchCountRoot = angular.element(document.querySelectorAll(attrs.watchCountRoot)[0]);
          }
        } else {
          watchCountRoot = angular.element(document.documentElement);
        }

        scope.$watch(function() {
          if (timerNow() - lastRun.watchCount < waitTime) {
            return scope.ngStats.watchCount;
          } else {
            lastRun = timerNow();
            return getWatcherCount(watchCountRoot);
          }
        }, function(newVal) {
          scope.ngStats.watchCount = newVal;
        });
      }

      function setupDigestLength() {
        var sum = 0;
        var times = [0,0,0,0];
        var timesIdx = 0;

        // force all $newed up scopes to have the $watches
        var scopePrototype = Object.getPrototypeOf($rootScope);
        var oldDigest = scopePrototype.$digest;
        scopePrototype.$digest = function $digest() {
          var start = timerNow();

          var ret = oldDigest.apply(this, arguments);
          if (start - lastRun.digestLength < waitTime) {
            return ret;
          }
          var end = timerNow();
          var diff = (end - start);
          sum = sum - times[timesIdx] + diff;
          times[timesIdx] = diff;
          timesIdx = (timesIdx + 1) % times.length;
          var avg = sum / times.length;
          scope.ngStats.digestLength = avg.toFixed(2);
          lastRun = end;
          return ret;
        };
      }
    }
  };

  // Utilities
  function getWatcherCount(element, watcherCount) {
    watcherCount = watcherCount || 0;
    var isolateWatchers = getWatchersFromScope(element.data().$isolateScope);
    var scopeWatchers = getWatchersFromScope(element.data().$scope);
    var watchers = scopeWatchers.concat(isolateWatchers);
    watcherCount += watchers.length;
    angular.forEach(element.children(), function (childElement) {
      watcherCount += getWatcherCount(angular.element(childElement));
    });
    return watcherCount;
  }

  function getWatchersFromScope(scope) {
    return scope && scope.$$watchers ? scope.$$watchers : [];
  }
});