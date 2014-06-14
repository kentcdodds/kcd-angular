angular.module('kcd.site').controller('MainCtrl', function($scope, AngularThingsGetter) {
  'use strict';
  $scope.greeting = 'Hello world!';
  $scope.angularThings = [
    {
      name: 'Constants (libraries)',
      things: AngularThingsGetter.constants(),
      popover: 'All libraries are constants in my apps. This helps testability.'
    },
    {
      name: 'Directives',
      things: AngularThingsGetter.directives()
    },
    {
      name: 'Services',
      things: AngularThingsGetter.services()
    },
    {
      name: 'Filters',
      things: AngularThingsGetter.filters()
    }
  ];
});