angular.module('kcd.filters').filter('kcdDate', function($filter) {
  'use strict';
  /* jshint quotmark: false */
  return function kcdDate(date, format) {
    return $filter('date')(date, format || "MMM d, yyyy',' h:mm a");
  };
});