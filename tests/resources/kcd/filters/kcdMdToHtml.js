angular.module('kcd.filters').filter('kcdMdToHtml', function(marked, $sce) {
  'use strict';
  return function(input) {
    if (!input) {
      return input;
    }
    return $sce.trustAsHtml(marked(input));
  };
});