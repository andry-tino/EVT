/**
 * Grunt configuration.
 * Remarks: Supported platforms:
 * - Windows
 * - Unix-based (not tested)
 */

module.exports = function(grunt) {
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    
    tsc: 'node node_modules/typescript/bin/tsc.js',
    
    // Shell commands
    shell: {
      compileBrowser: {
        command: '<%= tsc %> --project src'
      },
      compileExamples: {
        command: '<%= tsc %> --project examples'
      },
      compileServer: {
        command: '<%= tsc %> --project src/server'
      },
      compile: {
        command: ''
      }
    },
    
    // Copy
    copy: {
    }
  }; // End of config

  // Configuration post-initialization
  var utils = {
    acquire: function(dst, src) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
  };
  
  (function(shell) {
    shell.compile.command = [shell.compileBrowser.command, shell.compileServer.command].join('&&');
  })(config.shell);

  // Applying configuration
  grunt.initConfig(config);

  // Loading packages
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  // Tasks
  {
    var def = ['shell:compileBrowser'];
    var examples = ['shell:compileExamples'];
    
    grunt.registerTask('default', def);
    grunt.registerTask('examples', examples);
  } // End of tasks
};