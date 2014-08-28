angular.module('kcd.site').controller('ThingCtrl', function($scope, thing, MochaService) {
  'use strict';
  $scope.thing = thing;
  $scope.isLibrary = !!thing.libraryLink;
  $scope.hasExample = !!thing.example;
  $scope.hasTests = !!thing.spec;
  $scope.testOnClear = MochaService.clearSuites;
});