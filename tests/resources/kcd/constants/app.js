(function() {
  'use strict';

  var app = angular.module('kcd.constants', []);
  function addConstant(name) {
    if (window[name]) {
      app.constant(name, window[name]);
    }
  }
  addConstant('_');
  addConstant('marked');
  addConstant('hljs');
  addConstant('moment');
})();