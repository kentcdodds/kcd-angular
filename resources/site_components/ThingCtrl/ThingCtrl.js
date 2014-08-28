angular.module('kcd.site').controller('ThingCtrl', function($scope, thing, MochaService, $anchorScroll, $location, $timeout) {
  'use strict';
  $scope.thing = thing;
  $scope.isLibrary = !!thing.libraryLink;
  $scope.hasExample = !!thing.example;
  $scope.hasTests = !!thing.spec;
  $scope.testOnClear = MochaService.clearSuites;
  $scope.scrollTo = function scrollTo(id) {
    $location.hash(id);
    $anchorScroll();
  };
  $timeout(function() {
    $anchorScroll();
  }, 500); // wait for a few digests to run to get the height to its max
});