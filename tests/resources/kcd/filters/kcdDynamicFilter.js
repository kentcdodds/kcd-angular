angular.module('kcd.filters').filter('kcdDynamicFilter', function($filter) {
  'use strict';
  return function(input, filterName) {
    if (!filterName) {
      return input;
    }
    var filter = $filter(filterName);
    var args = Array.prototype.slice.call(arguments, 0);
    args.splice(1, 1); // remove filter name
    return filter.apply(null, args); // invoke filter with args received
  };
});