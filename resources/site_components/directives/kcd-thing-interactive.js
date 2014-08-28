angular.module('kcd.site').directive('kcdThingInteractive', function($compile) {
  'use strict';

  return {
    template: function() {
      return [
        '<div class="kcd-thing-interactive-wrapper">',
          '<div class="controls">',
            '<a ng-click="reset()" tooltip="Reset to original code">Reset</a>',
            ' | ',
            '<a ng-click="onEditClick()" tooltip="You can edit this code">{{edit ? "View Changes" : "Edit"}}</a>',
          '</div>',
          '<alert type="danger" close="alert=null" ng-if="alert">',
            '<strong>Script Error:</strong><br />{{alert.message}}<br /><small>see console</small>',
          '</alert>',
          '<div ng-hide="edit" class="interactive-area"></div>',
          '<ui-codemirror ui-codemirror-opts="::{lineNumbers: true, mode: \'htmlmixed\'}" ng-show="edit" ng-model="html"></ui-codemirror>',
        '</div>'
      ].join(' ');
    },
    scope: {
      interactive: '=kcdThingInteractive',
      onClear: '&?'
    },
    link: function(scope, el) {
      scope.onClear = scope.onClear || angular.noop;
      var childScope = null;
      var childEl = null;
      var interactiveArea = el.find('.interactive-area');

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
        scope.html = scope.interactive;
        attachHtml(scope.interactive);
      }

      function clear() {
        scope.onClear();
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

        interactiveArea.append(childEl);
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