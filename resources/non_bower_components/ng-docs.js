// This is a module I made up that's based on the examples given in angular's docs.

angular.module('ngDocsExamples', []).
  // https://docs.angularjs.org/api/ng/type/ngModel.NgModelController
  directive('contenteditable', function() {
    'use strict';
    return {
      restrict: 'A',
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {
        if(!ngModel) {
          return; // do nothing if no ng-model
        }

        // Specify how UI should be updated
        ngModel.$render = function() {
          element.text(ngModel.$viewValue || '');
        };

        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
          scope.$apply(read);
        });
        read(); // initialize

        // Write data to the model
        function read() {
          var html = htmlDecode(element.html());
          // When we clear the content editable the browser leaves a <br> behind
          if (html === '<br>') {
            html = '';
          }
          ngModel.$setViewValue(html);
        }
      }
    };

    function htmlDecode(input){
      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
    }
  });