(function() {
  'use strict';

  var dependencies = [
    'ngAnimate',
    'ui.router', 'ui.bootstrap', 'Scope.safeApply',
    'ui.codemirror',
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
        thingDocs: getFileStringGetter('docsPath', 'docs'),
        thingExample: getFileStringGetter('examplePath', 'example'),
        thingCode: getFileStringGetter('codePath', 'code', 'libraryLink'),
        thingSpec: getFileStringGetter('specPath', 'spec', 'libraryLink'),
        thingSpecTestHtml: function(thing, thingSpec, MochaService) {
          if (!thingSpec) {
            return;
          }
          thing.specHtml = MochaService.getTestHtmlForSpec(thingSpec);
          return thing.specHtml;
        }
      }
    });

    function getFileStringGetter(pathProp, assignmentProp, checkProp) {
      return function($http, thing) {
        if (checkProp && thing[checkProp]) { // passes extra check if necessary
          return null;
        }
        if (thing[assignmentProp]) { // it's already been set
          return thing[assignmentProp];
        }
        var path = thing[pathProp];
        if (!path) {
          return;
        }
        return $http.get(path).then(function success(response) {
          thing[assignmentProp] = response.data;
          return thing[assignmentProp];
        }, function error(err) {
          console.warn(err);
          return 'Error loading ' + assignmentProp;
        });
      };
    }

    $urlRouterProvider.otherwise('/');
  });

  site.run(function($rootScope, $stateParams) {
    $rootScope.section = $stateParams.thing || '';
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      console.log('$stateChangeSuccess: ' + toState.name);
      $rootScope.section = $stateParams.thing || '';
    });
  });
})();