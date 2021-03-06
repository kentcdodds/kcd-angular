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
    bc + 'jquery/dist/jquery.js', // has to be before angular so angular will use jQuery instead of jqLite
    bc + 'angular/angular.js'
  ];

  var styles = _.union([
    nbc + 'bootstrap-and-theme/bootstrap.min.css',
    bc + 'fontawesome/css/font-awesome.min.css',
    bc + 'toastr/toastr.min.css',
    nbc + 'highlight.js/github.css',
    bc + 'codemirror/lib/codemirror.css',
    bc + 'mocha/mocha.css',
    sc + 'styles/styles.css'
  ]);

  var scripts = _.union(
    [
      // test related stuff
      bc + 'mocha/mocha.js',
      bc + 'chai/chai.js',
      sc + 'one-off/mocha-setup.js',
      bc + 'angular-mocks/angular-mocks.js',
      // non angular related stuff
      bc + 'lodash/dist/lodash.js',
      bc + 'toastr/toastr.min.js',
      bc + 'marked/lib/marked.js',
      bc + 'Faker/minfaker.js',
      bc + 'moment/moment.js',
      nbc + 'highlight.js/highlight.pack.js',
      bc + 'codemirror/lib/codemirror.js',
      bc + 'codemirror/mode/htmlmixed/htmlmixed.js',
      bc + 'codemirror/mode/xml/xml.js',
      bc + 'codemirror/mode/javascript/javascript.js',
      bc + 'codemirror/mode/css/css.js',

      // angular core team stuff
      bc + 'angular-animate/angular-animate.min.js',

      // angular-ui
      bc + 'angular-ui-router/release/angular-ui-router.js',
      bc + 'angular-bootstrap/ui-bootstrap-tpls.js',

      // other angular mods
      bc + 'angular-ui-codemirror/ui-codemirror.min.js',
      bc + 'angularjs-scope.safeapply/src/Scope.SafeApply.min.js'
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
    var theFiles = _.union(appJs, otherJsFiles);
    if (env !== 'test') {
      _.remove(theFiles, function(file) {
        return endsWith(file, 'Spec.js');
      });
    }
    return theFiles;
  }

  function getModuleAndSubmodules(root, submodules) {
    var files = [];
    _.each(submodules, function(submod) {
      files = _.union(files, getSection(root + submod + '/'));
    });
    files = _.union(files, getSection(root));
    return files;
  }

  function endsWith(str, ends){
    if (ends === '') {
      return true;
    }
    if (!str || !ends) {
      return false;
    }
    str = String(str);
    ends = String(ends);
    return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
  }

};