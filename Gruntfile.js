module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    todo: {
      dist: {
        src: 'src/*.js'
      }
    },

    jshint: {
      dist: {
        src: 'src/*.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/drawer-<%= pkg.version %>.min.js': 'src/drawer.js'
        }
      }
    }
  });

  grunt.registerTask('default', [
    'todo',
    'jshint',
    'uglify'
  ]);
};
