/**
 * Grunt configuration.
 * Remarks: Supported platforms:
 * - Windows
 */

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    tsc: 'node node_modules/typescript/bin/tsc.js',
    outName: '<%= pkg.name %>-out',
    outServerName: '<%= pkg.name %>-srv-out',
    
    // Shell commands
    shell: {
      compile: {
        command: '<%= tsc %> --project src'
      },
      compileServer: {
        command: '<%= tsc %> --project src/server'
      }
    },
    
    // Copy
    copy: {
      examples: {
        files: [
          { src: ['out/<%= outName %>.min.js'], dest: 'examples/evt/<%= outName %>.min.js' },
          { src: ['out/<%= outName %>.js'], dest: 'examples/evt/<%= outName %>.js' },
          { src: ['out/<%= outServerName %>.min.js'], dest: 'examples/evt/<%= outServerName %>.min.js' },
          { src: ['out/<%= outServerName %>.js'], dest: 'examples/evt/<%= outServerName %>.js' }
        ],
      },
    },
    
    // Uglify
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'out/<%= outName %>.js': 'out/<%= outName %>.min.js'
        }
      },
      buildServer: {
        files: {
          'out/<%= outServerName %>.js': 'out/<%= outServerName %>.min.js'
        }
      }
    }
  });

  // Loading packages
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s): build and minify
  grunt.registerTask('default', ['shell:compile', 'shell:compileServer', 'uglify:build', 'uglify:buildServer']);
  grunt.registerTask('build-examples', ['shell:compile', 'shell:compileServer', 'uglify:build', 'uglify:buildServer', 'copy:examples']);
};