'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var fs = require('fs');

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    mbklight: {
      // configurable paths
      theme: 'theme',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      compass: {
        files: ['<%= mbklight.theme %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= mbklight.dist %>/*',
            '!<%= mbklight.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= mbklight.theme %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= mbklight.theme %>/images',
        javascriptsDir: '<%= mbklight.theme %>/scripts',
        fontsDir: '<%= mbklight.theme %>/styles/fonts',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        importPath: 'bower_components/bootstrap-sass/assets/stylesheets/',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= mbklight.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= mbklight.theme %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= mbklight.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= mbklight.theme %>/images',
          src: '{,*/}*.svg',
          dest: '<%= mbklight.dist %>/images'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= mbklight.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= mbklight.theme %>',
          dest: '<%= mbklight.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '{,**/}*.php',
            'js/*.js',
            'images/{,*/}*.{webp}',
            'fonts/*',
          ]
        },
        {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= mbklight.dist %>/images',
          src: ['generated/*']
        },
        {
          expand: true, // Copy styles to the root directory
          cwd: '.tmp/styles',
          dest: '<%= mbklight.dist %>',
          src: '*.css'
        },
        {
          expand: true, // Copy bootstrap scripts
          cwd: 'bower_components/bootstrap-sass/assets/javascripts/',
          dest: '<%= mbklight.dist %>/js',
          src: '**/*.js'
        },
        {
          expand: true, // Copy jquery scripts
          cwd: 'bower_components/jquery/dist',
          dest: '<%= mbklight.dist %>/js',
          src: '*.js'
        }]
      },
      styles: { 
        expand: true,
        cwd: '<%= mbklight.theme %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    compress: {
      dist: {
        options: {
          archive: 'mbklight.zip'
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**'],
          dest: 'mbklight'
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'autoprefixer',
    'copy:dist'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
