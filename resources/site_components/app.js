(function() {
  'use strict';

  var dependencies = [
    'ngAnimate',
    'ui.router', 'ui.bootstrap', 'Scope.safeApply', 'ngDocsExamples',
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
        thingCode: getFileStringGetter('codePath', 'code', 'libraryLink')
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
        return $http.get(thing[pathProp]).then(function success(response) {
          thing[assignmentProp] = response.data;
        }, function error(err) {
          return 'Error loading ' + assignmentProp;
        });
      };
    }

    $urlRouterProvider.otherwise('/');
  });

  site.run(function($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      console.log('$stateChangeSuccess: ' + toState.name);
    });
  });
})();