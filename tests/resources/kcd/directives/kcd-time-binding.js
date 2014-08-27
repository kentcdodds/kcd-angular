angular.module('kcd.directives').directive('kcdTimeBinding', function(moment, _, $parse) {
  'use strict';
  var comparators = {
    gt: function(a,b) {
      return a > b;
    },
    lt: function(a,b) {
      return a < b;
    }
  };
  return function kcdTimeBinding(scope, el, attrs) {
    var otherTimeGetter = $parse(attrs.otherTime);
    var otherTimeSetter = otherTimeGetter.assign;
    var myTimeGetter = $parse(attrs.kcdTimeBinding);
    var myTimeSetter = myTimeGetter.assign;
    var momentOperation = attrs.mustBe === 'gt' ? 'add' : 'subtract';

    scope.$watch(attrs.otherTime, function timeWatcher(_new, _old) {
      var newOtherTime = getTimeOfDayToday(_new);
      var oldOtherTime = getTimeOfDayToday(_old);
      if (_.isEqual(newOtherTime, oldOtherTime)) {
        return;
      }
      var myTime = getTimeOfDayToday(myTimeGetter(scope));
      if (!comparators[attrs.mustBe](myTime, newOtherTime)) {
        otherTimeSetter(scope, new Date(newOtherTime));
        myTimeSetter(scope, new Date(newOtherTime[momentOperation]('minutes', 1)));
      }
    });

    function getTimeOfDayToday(date) {
      var timeOfDay = moment(date);
      return moment({ h: timeOfDay.hour(), m: timeOfDay.minute() });
    }

  };
});