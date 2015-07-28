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
    
    outName: '<%= pkg.name %>-out',
    outServerName: '<%= pkg.name %>-srv-out',
    
    // Require.js
    requirejs: {
      compile: {
        options: {
          baseUrl: "path/to/base",
          mainConfigFile: "path/to/config.js",
          name: "path/to/almond", // assumes a production build using almond
          out: "path/to/optimized.js"
        }
      }
    },
    
    // Shell commands
    shell: {
      compile: {
        command: '<%= tsc %> --project src'
      },
      compileServer: {
        command: '<%= tsc %> --project src/server'
      },
      compileAll: {
        command: ''
      }
    },
    
    // Copy
    copy: {
      examples: {
        def: {
          files: [
            { src: ['out/<%= outName %>.min.js'], dest: 'examples/evt/<%= outName %>.min.js' },
            { src: ['out/<%= outName %>.js'], dest: 'examples/evt/<%= outName %>.js' }
          ]
        },
        srv: {
          files: [
            { src: ['out/<%= outServerName %>.min.js'], dest: 'examples/evt/<%= outServerName %>.min.js' },
            { src: ['out/<%= outServerName %>.js'], dest: 'examples/evt/<%= outServerName %>.js' }
          ]
        },
        all: {
          files: []
        }
      },
    },
    
    // Uglify
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      def: {
        files: {
          'out/<%= outName %>.min.js': ['out/<%= outName %>.js']
        }
      },
      srv: {
        files: {
          'out/<%= outServerName %>.min.js': ['out/<%= outServerName %>.js']
        }
      },
      all: {
        files: {}
      }
    }
  };

  // Configuration post-initialization
  var utils = {
    acquire: function(dst, src) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
  };
  
  (function(shell) {
    shell.compileAll.command = [shell.compile.command, shell.compileServer.command].join('&&');
  })(config.shell);
  
  (function(copy) {
    copy.examples.all = copy.examples.def.files.concat(copy.examples.srv.files);
  })(config.copy);
  
  (function(uglify) {
    utils.acquire(uglify.all.files, uglify.def.files);
    utils.acquire(uglify.all.files, uglify.srv.files);
  })(config.uglify);

  // Applying configuration
  grunt.initConfig(config);

  // Loading packages
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  // Tasks
  grunt.registerTask('default', ['shell:compileAll', 'uglify:all']);
  grunt.registerTask('build-def', ['shell:compile', 'uglify:def']);
  grunt.registerTask('build-srv', ['shell:compileServer', 'uglify:srv']);
  grunt.registerTask('build-examples', ['shell:compileAll', 'uglify:all', 'copy:examples:all']);
};