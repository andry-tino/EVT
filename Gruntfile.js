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
    
    outBrowserName: '<%= pkg.name %>-bws-out',
    outServerName: '<%= pkg.name %>-srv-out',
    
    // Require
    requirejs: {
      browser: {
        options: {
          baseUrl: "out",
          modules: [
            {
              name: 'evt',
              include: [
                'Data/elementInSituEventDataProvider',
                'Data/eventBatch',
                'Data/eventData',
                'Data/eventDataProvider',
                'ElementProvider/depthFirstElementProvider',
                'ElementProvider/elementProvider',
                'comparable', 
                'disposable', 
                'eventCollector',
                'eventId',
                'evtEvent',
                'evtHtmlElement',
                'serializable',
                'treeStructure',
                'volumeStream'
              ]
            }
          ],
          dir: 'out/_optimized'
        }
      }
    },
    
    // Shell commands
    shell: {
      compileBrowser: {
        command: '<%= tsc %> --project src'
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
      browserBundle: {
        files: [
          { src: ['out/_optimized/evt.js'], dest: 'out/<%= outBrowserName %>.js' }
        ]
      },
      serverBundle: {
        files: [
          { src: [''], dest: '' }
        ]
      },
      examples: {
        files: [
          { src: ['out/<%= outBrowserName %>.js'], dest: 'examples/evt/<%= outBrowserName %>.js' },
          { src: ['libs/require.js'], dest: 'examples/js/require.js' }
        ]
      }
    }
  };
  
  // Generating out HTML file
  grunt.registerTask('generateHtml', function() {
    
  });

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
    var def = ['shell:compileBrowser', 'requirejs:browser', 'copy:browserBundle'];
    var examples = def.concat(['copy:examples']);
    
    grunt.registerTask('default', def);
    grunt.registerTask('examples', examples);
  }
};