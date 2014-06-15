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
          if (thing.docs) { // it's already been set
            return thing.docs;
          }

          return $http.get(thing.docsPath).then(function success(response) {
            thing.docs = response.data;
            return thing.docs;
          }, function error(err) {
            return 'Error loading docs';
          });
        },
        thingCode: function($http, thing) {
          if (thing.libraryLink) { // we're not showing library code
            return null;
          }
          if (thing.code) { // it's already been set
            return thing.code;
          }

          return $http.get(thing.codePath).then(function success(response) {
            thing.code = response.data;
            return thing.code;
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