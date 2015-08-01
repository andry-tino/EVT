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
    
    // Require
    requirejs: {
      compile: {
        options: {
          baseUrl: "out",
          modules: [
            {
              name: 'volumeStream',
              include: ['treeStructure', 'serializable', 'comparable']
            }
          ]
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
        files: [
          { src: ['out/evt.js'], dest: 'examples/evt/' }
        ]
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
  /*
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
  */

  // Applying configuration
  grunt.initConfig(config);

  // Loading packages
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  // Tasks
  grunt.registerTask('default', ['shell:compileAll', 'uglify:all']); // Not working
  grunt.registerTask('build-def', ['shell:compile', 'requirejs']); // Not working
  grunt.registerTask('build-def2', ['shell:compile']); // TBR
  grunt.registerTask('build-srv', ['shell:compileServer', 'uglify:srv']); // Not working
  //grunt.registerTask('build-examples', ['shell:compileAll', 'uglify:all', 'copy:examples:all']); // Not working
  grunt.registerTask('build-examples', ['shell:compile', 'copy:examples']);
  grunt.registerTask('aaa', ['copy:examples']); // TBR
};