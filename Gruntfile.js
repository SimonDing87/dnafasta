module.exports = function(grunt) {
  grunt.initConfig({

    jshint: {
      files: ['client/*.js', 'server/*.js', '*.json']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');


  grunt.registerTask('default', ['jshint']);
};
