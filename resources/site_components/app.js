(function() {
  'use strict';

  var dependencies = [
    'ngAnimate',
    'ui.router', 'ui.bootstrap', 'Scope.safeApply',
    'kcd'
  ];

  var site = angular.module('kcd.site', dependencies);
  site.config(function($stateProvider, $urlRouterProvider) {
    var site = 'resources/site_components/';
    $stateProvider.state('root', {
      url: '/',
      templateUrl: site + 'MainCtrl/MainCtrl.html',
      controller: 'MainCtrl',
      abstract: true
    });

    $stateProvider.state('root.default', {
      url: '',
      templateUrl: site + 'MainCtrl/main-default.html'
    });

    $stateProvider.state('root.thing', {
      url: ':thing',
      templateUrl: site + 'ThingCtrl/ThingCtrl.html',
      controller: 'ThingCtrl',
      resolve: {
        thing: function($stateParams, AngularThingsGetter) {
          var thingName = $stateParams.thing;
          return AngularThingsGetter.getThing(thingName);
        },
        thingDocs: function($http, thing) {
          if (thing.docs) return thing.docs; // it's already been set

          return $http.get(thing.docsPath).then(function success(response) {
            return thing.docs = response.data;
          }, function error(err) {
            return 'Error loading docs';
          });
        },
        thingCode: function($http, thing) {
          if (thing.libraryLink) return null; // we're not showing library code
          if (thing.code) return thing.code; // it's already been set

          return $http.get(thing.codePath).then(function success(response) {
            return thing.code = response.data;
          }, function error(err) {
            return 'Error loading code';
          });
        }
      }
    });

    $urlRouterProvider.otherwise('/');
  });

  site.run(function($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      console.log('$stateChangeSuccess: ' + toState.name);
    });
  });
})();