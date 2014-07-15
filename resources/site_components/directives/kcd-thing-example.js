angular.module('kcd.site').directive('kcdThingExample', function($compile) {
  'use strict';

  return {
    template: function() {
      return [
        '<div>',
          '<a ng-click="reset()">Reset</a> | <a ng-click="onEditClick()">{{edit ? "View Changes" : "Edit"}}</a>',
          '<alert type="danger" close="alert=null" ng-if="alert">',
            '<strong>Script Error:</strong><br />{{alert.message}}<br /><small>see console</small>',
          '</alert>',
          '<div ng-hide="edit" class="example-area"></div>',
          '<ui-codemirror ui-codemirror-opts="::{lineNumbers: true}" ng-show="edit" ng-model="html"></ui-codemirror>',
        '</div>'
      ].join(' ');
    },
    scope: {
      example: '=kcdThingExample'
    },
    link: function(scope, el) {
      var childScope = null;
      var childEl = null;
      var exampleArea = el.find('.example-area');

      scope.reset = reset;
      scope.edit = false;
      scope.onEditClick = onEditClick;

      reset();

      // FUNCTIONS
      function onEditClick() {
        if (scope.edit) {
          attachHtml(scope.html);
          scope.edit = false;
        } else {
          scope.alert = null;
          scope.edit = true;
        }
      }

      function reset() {
        scope.html = scope.example;
        attachHtml(scope.example);
      }

      function clear() {
        // clear the current scope and element
        if (childScope) {
          childScope.$destroy();
          childEl.remove();
        }
        childEl = childScope = null;
      }


      function attachHtml(html) {
        clear();

        if (!html) {
          return;
        }

        childScope = scope.$new(true);

        childEl = angular.element('<span>');
        childEl[0].innerHTML = html;

        // remove the script tags
        var scripts = childEl.find('script').remove();
        $compile(childEl)(childScope);

        exampleArea.append(childEl);
        angular.forEach(scripts, function(script) {
          evalScript(script.textContent, childScope);
        });
      }

      /**
       * Crazy stuff, but the $scope variable is actually in the eval context...
       * @param js
       * @param $scope
       */
      function evalScript(js, $scope) {
        /* jshint evil:true */
        try {
          eval(js);
        } catch(e) {
          scope.alert = {
            message: e.message
          };
          console.warn(e);
        }
      }
    }
  };

});