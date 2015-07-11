module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // Shell commands
    shell: {
      tsCompile: {
        command: 'tsc src/evt.ts --out out/<%= pkg.name %>.js --target ES5'
      }
    },
    
    // Copy
    copy: {
      examples: {
        files: [
          { src: ['out/<%= pkg.name %>.min.js'], dest: 'examples/evt/<%= pkg.name %>.min.js' },
          { src: ['out/<%= pkg.name %>.js'], dest: 'examples/evt/<%= pkg.name %>.js' }
        ],
      },
    },
    
    // Uglify
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'out/<%= pkg.name %>.js',
        dest: 'out/<%= pkg.name %>.min.js'
      }
    }
  });

  // Loading packages
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s): build and minify
  grunt.registerTask('default', ['shell:tsCompile', 'uglify']);
  grunt.registerTask('build-examples', ['shell:tsCompile', 'uglify', 'copy:examples']);
};