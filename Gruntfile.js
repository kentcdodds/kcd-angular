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
      publish: getJadeConfig('publish')
    },
    watch: {
      stylus: {
        files: [kcd + '**/*.styl', sc + '**/*.styl', 'Gruntfile.js'],
        tasks: 'stylus'
      },
      jade: {
        files: ['builder/**', 'Gruntfile.js'],
        tasks: 'jade'
      }
    },
    'gh-pages': {
      options: {
        message: 'Auto-generated commit'
      },
      src: ['**', '!node_modules/**', '!builder/**', '!bower.json', '!Gruntfile.js']
    }
  });

  function getJadeConfig(env) {
    return {
      options: {
        data: function() {
          return require('./builder/getIndexData')(env);
        },
        pretty: true
      },
      files: {
        'index.html': ['builder/index.jade']
      }
    };
  }

  grunt.registerTask('publish', ['jshint', 'stylus', 'jade:publish', 'gh-pages', 'jade:local']);

  grunt.registerTask('nohint', ['stylus', 'jade:local']);
  grunt.registerTask('build', ['jshint', 'nohint']);
  // Default task(s).
  grunt.registerTask('default', 'build');

};