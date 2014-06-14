angular.module('kcd.site').directive('kcdClipboardCopy', function() {
  'use strict';
  var template = [
    '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="110" height="14" id="clippy">',
      '<param name="movie" value="resources/non_bower_components/clippy.swf"/>',
      '<param name="allowScriptAccess" value="always" />',
      '<param name="quality" value="high" />',
      '<param name="scale" value="noscale" />',
      '<param NAME="FlashVars" value="text=#{text}">',
      '<param name="bgcolor" value="#FFF">',
      '<embed src="resources/non_bower_components/clippy.swf" width="110" height="14" name="clippy" quality="high"',
          'allowScriptAccess="always" type="application/x-shockwave-flash"',
          'pluginspage="http://www.macromedia.com/go/getflashplayer" FlashVars="text=#{text}" bgcolor="#FFF"/>',
    '</object>'
  ].join(' ');
  return {
    restrict: 'E',
    link: function(scope, el, attrs) {
      if (!attrs.text) {
        return;
      }
      var compiled = template.replace(/#\{text\}/g, attrs.text);
      var clipboardComponent = angular.element(compiled);
      el.replaceWith(clipboardComponent);
    }
  };
});