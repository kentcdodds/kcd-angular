angular.module('kcd.site').factory('AngularThingsGetter', function(_) {
  'use strict';
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var ARGUMENT_NAMES = /([^\s,]+)/g;
  var camelCase = /([A-Z])/g;

  var libraryLinks = {
    _: 'http://lodash.com',
    marked: 'https://github.com/chjj/marked',
    hljs: 'http://highlightjs.org/',
    moment: 'http://momentjs.com/'
  };
  var featured = ['kcd-recompile', 'kcd-remove-watchers', 'kcd-custom-validation', 'kcdDynamicFilter', 'kcd-dynamic-attr'];

  var thingMap = {
    filters: null
  };

  var typeNameMap = {
    $filterProvider: 'filter',
    $compileProvider: 'directive',
    $provide: 'service'
  };

  var allTheThings = [];
  _.each(angular.module('kcd').requires, function(submoduleName) {
    allTheThings = _.union(allTheThings, getThings(angular.module(submoduleName)));
  });


  return {
    directives: getGetterThingsOfType('directive'),
    services: getGetterThingsOfType('service'),
    filters: getGetterThingsOfType('filter'),
    constants: getGetterThingsOfType('constant'),
    getThing: getThingInfo
  };

  function getThingInfo(thingName) {
    return _.find(allTheThings, {name: thingName});
  }

  function getGetterThingsOfType(type) {
    return function() {
      return getThingsOfType(type);
    };
  }

  function getThingsOfType(type) {
    if (!thingMap[type]) {
      thingMap[type] = _.where(allTheThings, { type: type });
    }
    return thingMap[type];
  }


  // UTILITY FUNCTIONS

  function getThings(mod) {
    return _.map(mod._invokeQueue, function(item) {
      var type = typeNameMap[item[0]];
      if (item[1] === 'constant') {
        type = 'constant';
      }
      if (!type) {
        console.warn('Not mapped type for item: ', item);
      }
      var definition = _.last(item[2], 1);
      var name = getFixedName(type, item[2][0]);
      var filePath = 'resources/kcd/' + type + 's/' + name;
      return {
        name: name,
        type: type,
        docsPath: filePath + '-docs.md',
        examplePath: filePath + '-example.html',
        dependencies: type === 'constant' ? [] : getDependencies(definition),
        codePath: filePath + '.js',
        specPath: filePath + 'Spec.js',
        libraryLink: libraryLinks[name],
        isFeatured: _.contains(featured, name)
      };
    });
  }

  function getDependencies(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null) {
      result = [];
    }
    return result;
  }

  function getFixedName(type, name) {
    if (type === 'directive') {
      name = name.replace(camelCase, '-$1').toLowerCase();
    }
    return name;
  }
});