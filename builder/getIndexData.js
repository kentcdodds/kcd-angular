var fs = require('fs');
var _ = require('lodash-node');
var glob = require('glob');

module.exports = function(env) {
  'use strict';
  var r = 'resources/';
  var bc = r + 'bower_components/';
  var nbc = r + 'non_bower_components/';
  var sc = r + 'site_components/';
  var kcd = r + 'kcd/';
  var topScripts = [
    bc + 'angular/angular.js'
  ];

  var styles = _.union([
    nbc + 'bootstrap-and-theme/bootstrap.min.css',
    bc + 'fontawesome/css/font-awesome.min.css',
    bc + 'toastr/toastr.min.css',
    sc + 'styles/styles.css',
    nbc + 'highlight.js/github.css'
  ]);

  var scripts = _.union(
    [
      // non angular related stuff
      bc + 'jquery/dist/jquery.js',
      bc + 'lodash/dist/lodash.js',
      bc + 'toastr/toastr.min.js',
      bc + 'marked/lib/marked.js',
      bc + 'moment/moment.js',
      nbc + 'highlight.js/highlight.pack.js',

      // angular core team stuff
      bc + 'angular-animate/angular-animate.min.js',

      // angular-ui
      bc + 'angular-ui-router/release/angular-ui-router.js',
      bc + 'angular-bootstrap/ui-bootstrap-tpls.js',

      // other angular mods
      bc + 'angularjs-scope.safeapply/src/Scope.SafeApply.min.js',
      nbc + 'ng-docs.js'
    ],
    // parakeet stuff
    // kcd components first
    getModuleAndSubmodules(kcd, ['constants', 'services', 'filters', 'directives']),
    // site components
    getSection(sc)
  );

  var data = {
    onDev: false,
    BASE_URL: 'http://kent.doddsfamily.us/kcd-angular/',
    topScripts: topScripts,
    stylesheets: styles,
    scripts: scripts
  };
  if (/local/.test(env)) {
    data.onDev = true;
    data.BASE_URL = 'http://localhost:8000/';
  }

  console.log('I am here: ', process.cwd());

  return data;


  // FUNCTIONS

  function getFilesInPath(pattern, removePrefix) {
    var files = glob.sync(pattern);
    if (removePrefix) {
      _.each(files, function (file, num) {
        files[num] = file.substring(removePrefix.length);
      });
    }
    return files;
  }

  function getSection(name) {
    var appJs = getFilesInPath(name + 'app.js');
    var otherJsFiles = getFilesInPath(name + '**/*.js');
    return _.union(appJs, otherJsFiles);
  }

  function getModuleAndSubmodules(root, submodules) {
    var files = [];
    _.each(submodules, function(submod) {
      files = _.union(files, getSection(root + submod + '/'))
    });
    files = _.union(files, getSection(root));
    return files;
  }

};