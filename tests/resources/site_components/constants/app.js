(function() {
  'use strict';

  var app = angular.module('kcd.site');
  function addConstant(name) {
    if (window[name]) {
      app.constant(name, window[name]);
    }
  }
  addConstant('faker');
  addConstant('mocha');
})();