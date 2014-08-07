angular.module('kcd.site').controller('ThingCtrl', function($scope, thing) {
  'use strict';
  $scope.thing = thing;
  $scope.isLibrary = !!thing.libraryLink;
  $scope.hasExample = !!thing.example;
});