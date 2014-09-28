module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          '../default/css/foundation.css': 'scss/app.scss',
          '../default/css/custom.css': 'scss/custom.scss',
          '../default/css/custom.medium.css': 'scss/custom.medium.scss',
          '../default/css/custom.large.css': 'scss/custom.large.scss',
          '../default/css/custom.xlarge.css': 'scss/custom.xlarge.scss',
          '../default/css/custom.nav.css': 'scss/custom.nav.scss',
          '../default/css/custom.nav.full.css': 'scss/custom.nav.full.scss'
        }        
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    }
  });
  grunt.option('color', false);
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
}