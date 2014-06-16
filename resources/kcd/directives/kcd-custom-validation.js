angular.module('kcd.directives').directive('kcdCustomValidation', function() {
  'use strict';

  return {
    require: 'ngModel',
    link: function(scope, el, attrs, ctrl) {
      var validators = scope.$eval(attrs.kcdCustomValidation);
      if (!validators) {
        return;
      }
      if (!angular.isArray(validators)) {
        validators = [validators];
      }

      // setup watchers and parsers
      angular.forEach(validators, function(validator) {
        if (validator.watch) {
          scope.$watch(validator.watch, function(value) {
            applyValidity(validator, value);
          });
        } else {
          ctrl.$parsers.unshift(function(viewValue) {
            applyValidity(validator, viewValue);
            return viewValue;
          });
        }
      });

      function applyValidity(validator, value) {
        if (validator.fn(value)) {
          ctrl.$setValidity(validator.name, true);
        } else {
          ctrl.$setValidity(validator.name, false);
        }
      }
    }
  };
});