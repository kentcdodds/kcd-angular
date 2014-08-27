angular.module('kcd.site').controller('MainCtrl', function($scope, AngularThingsGetter, $filter, $state) {
  'use strict';
  var allTheThings = [];
  $scope.onSearchEntered = function($event) {
    var searchedThings = $filter('filter')(allTheThings, $scope.thingSearch);
    if (searchedThings && (searchedThings.length === 1 || $event.keyCode === 13)) {
      $state.go('root.thing', {thing: searchedThings[0].name});
      if ($event.keyCode === 13) {
        $scope.thingSearch = null;
      }
    }
  };

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
    $scope.selected = toParams.thing;
  });

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
  angular.forEach($scope.angularThings, function(thingGroup) {
    allTheThings = allTheThings.concat(thingGroup.things);
  });
});