angular.module('kcd.directives').directive('kcdDynamicAttr', function kcdDynamicAttr() {
  'use strict';
  return {
    restrict: 'A',
    priority: 599, // one after ngIf
    controller: function($scope, $element, $attrs) {
      var attrNames = $attrs.kcdDynamicAttr.split(','); // allow for multiple replacements
      attrNames.forEach(function replaceAttr(attrName) {
        $attrs.$set(attrName, $scope.$eval($attrs[attrName]));
      });

      // clean up
      $element.removeAttr('kcd-dynamic-attr');
      delete $attrs.kcdDynamicAttr;
    }
  };
});