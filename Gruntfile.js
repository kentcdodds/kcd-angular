module.exports = function(grunt) {
  'use strict';
  var glob = require('glob');

  require('time-grunt')(grunt);
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
      local: {
        options: {
          data: function() {
            return require('./builder/getIndexData')('local');
          },
          pretty: true
        },
        files: {
          'index.html': ['builder/index.jade']
        }
      }
    },
    watch: {
      stylus: {
        files: [kcd + '**/*.styl', sc + '**/*.styl'],
        tasks: 'stylus'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('nohint', ['stylus', 'jade']);
  grunt.registerTask('build', ['jshint', 'nohint']);
  // Default task(s).
  grunt.registerTask('default', 'build');

};