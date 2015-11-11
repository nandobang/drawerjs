module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
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
          'dist/drawer.js': 'src/drawer.js'
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
