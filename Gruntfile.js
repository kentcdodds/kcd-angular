module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var r = 'resources/';
  var kcd = r + 'kcd/';
  var sc = r + 'site_components/';
  var styleFiles = {};
  styleFiles[sc + 'styles/styles.css'] = [ kcd + '**/*.styl', sc + '**/*.styl' ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: {
        src: [ kcd + '**/*.js', sc + '**/*.js' ]
      }
    },
    stylus: {
      compile: {
        options: {
          linenos: true
        },
        files: styleFiles
      }
    },
    jade: {
      local: getJadeConfig('local'),
      publish: getJadeConfig('publish'),
      test: getJadeConfig('test')
    },
    mocha: {
      all: {
        src: ['tests/index.html']
      },
      options: {
        run: true
      }
    },
    watch: {
      jade: {
        options: {
          event: ['added', 'deleted']
        },
        files: [ kcd + '**/*.js', sc + '**/*.js' ],
        tasks: 'jade'
      },
      stylus: {
        files: [kcd + '**/*.styl', sc + '**/*.styl', 'Gruntfile.js'],
        tasks: 'stylus'
      },
      dev: {
        files: [ kcd + '**/*.js', sc + '**/*.js' ],
        tasks: [ 'jshint', 'mocha' ]
      }
    },
    'gh-pages': {
      options: {
        message: 'Auto-generated commit'
      },
      src: ['**', '!node_modules/**', '!builder/**', '!bower.json', '!Gruntfile.js', '!resources/**/*Spec.js']
    }
  });

  function getJadeConfig(env) {
    var files = {
      'index.html': ['builder/index.jade']
    };
    if (env === 'test') {
      files = {
        'tests/index.html': ['builder/testrunner.jade']
      };
    }
    return {
      options: {
        data: function() {
          return require('./builder/getIndexData')(env);
        },
        pretty: true
      },
      files: files
    };
  }

  grunt.registerTask('ensureTest', ['jade:test', 'mocha']);

  grunt.registerTask('publish', ['jshint', 'ensureTest', 'stylus', 'jade:publish', 'gh-pages', 'jade:local']);

  grunt.registerTask('nohint', ['stylus', 'jade:local']);
  grunt.registerTask('build', ['jshint', 'ensureTest', 'nohint']);
  // Default task(s).
  grunt.registerTask('default', 'build');

};