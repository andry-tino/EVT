/**
 * Grunt configuration.
 * Remarks: Supported platforms:
 * - Windows
 * - Unix-based (not tested)
 */

module.exports = function(grunt) {
  var config = {
    pkg: grunt.file.readJSON("package.json"),
    
    tsc: "tsc",
    
    // Shell commands
    shell: {
      compileBrowser: {
        command: "<%= tsc %> --project src"
      },
      compileExamples: {
        command: "<%= tsc %> --project examples"
      },
      compileServer: {
        command: "<%= tsc %> --project src/server"
      },
      compile: {
        command: ""
      }
    },

    // Clean
    clean: {
      out: ["out/*"]
    }
  }; 
  
  (function(shell) {
    shell.compile.command = [shell.compileBrowser.command, shell.compileServer.command].join("&&");
  })(config.shell);

  // Applying configuration
  grunt.initConfig(config);

  // Loading packages
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-shell");

  // Tasks
  {
    var def       = ["clean:out", "shell:compileBrowser"];
    var browser   = ["clean:out", "shell:compileBrowser"];
    var server    = ["shell:compileServer"];
    var examples  = ["shell:compileExamples"];
    
    grunt.registerTask("default",   def);
    grunt.registerTask("examples",  examples);
    grunt.registerTask("server",    server);
  } // End of tasks
};