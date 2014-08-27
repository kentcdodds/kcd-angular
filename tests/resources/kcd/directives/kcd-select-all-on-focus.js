angular.module('kcd.directives').directive('kcdSelectAllOnFocus', function() {
  'use strict';
  return function kcdSelectAllOnFocus(scope, el) {
    el.on('focus', function() {
      setTimeout(function() {
        el.select();
      });
    });
  };
});