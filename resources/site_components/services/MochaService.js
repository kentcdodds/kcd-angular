angular.module('kcd.site').factory('MochaService', function MochaService(mocha) {
  'use strict';
  return {
    getTestHtmlForSpec: getTestHtmlForSpec,
    clearSuites: clearSuites
  };

  function getTestHtmlForSpec(spec) {
    return [
      '<div>',
        '<div id="mocha"></div>',
        '<script>',
          spec,
        '</script>',
        '<script>mocha.run();</script>',
      '</div>'
    ].join('\n');
  }

  function clearSuites() {
    mocha.suite.suites = [];
  }
});