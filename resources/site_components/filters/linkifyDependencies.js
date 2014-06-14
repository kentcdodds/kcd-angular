angular.module('kcd.site').filter('linkifyDependencies', function(_, $sce, AngularThingsGetter) {
  'use strict';
  return function(dependencies) {
    if (!dependencies || !_.isArray(dependencies)) {
      return dependencies;
    }
    var thingsText = [];
    _.each(dependencies, function(dep) {
      var thing = AngularThingsGetter.getThing(dep);
      var content = dep;
      var href = 'https://docs.angularjs.org/api/ng/service/' + dep;
      if (thing) {
        content = thing.name;
        href = '#/' + thing.name;
      }
      thingsText.push('<a href="' + href + '">' + content + '</a>');
    });
    return $sce.trustAsHtml(thingsText.join(', '));
  }
});