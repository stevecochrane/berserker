module.exports = function(grunt) {

    //  Project configuration.
    grunt.initConfig({

        //  Read in settings from package.json.
        pkg: grunt.file.readJSON('package.json'),

        //  Compile SASS w/ Compass. When in dev mode, output in expanded style so the CSS is 
        //  easy to read, and when in dist mode, output compressed (minified) for production.
        compass: {
            dev: {
                options: {
                    require: ['normalize'],
                    sassPath: 'src/sass',
                    cssPath: 'src/css',
                    imagesPath: 'src/img',
                    javascriptsPath: 'src/js',
                    outputStyle: 'expanded'
                }
            },
            dist: {
                options: {
                    require: ['normalize'],
                    sassPath: 'src/sass',
                    cssPath: 'dist/css',
                    imagesPath: 'dist/img',
                    javascriptsPath: 'dist/js',
                    outputStyle: 'compressed'
                }
            }
        },

        //  Lint test the JavaScript. (Only the new JS for this app, frameworks not included.)
        jshint: {
            //  Define the files to lint.
            //  Since I didn't specify /**/ this will ignore anything in src/js/libs/
            files: [
                'gruntfile.js',
                'src/js/*.js'
            ]
        },

        //  Concatenate multiple JavaScript files into a single file.
        concat: {
            options: {
                //  Define a string to put between each file in the concatenated output.
                //  The docs say this is a good thing to do when minifying the concatenated output:
                //  https://github.com/gruntjs/grunt-contrib-concat#separator
                separator: ';'
            },
            dist: {
                //  Add files to concatenate, in their intended order, here.
                src: ['src/js/*.js'],
                //  The location of the resulting JS file.
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        //  Minify the concatenated JavaScript file.
        uglify: {
            options: {
                //  Keep any loud comments (starting with /*!) to preserve licenses.
                preserveComments: 'some'
            },
            dist: {
                files: {
                    //  Take the concatendated file output from concat and minify it.
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        //  This will find any HTML files in the src folder, minify them, and place the 
        //  minified versions into the dist folder, preserving directory structure.
        //  (ex. /src/index.html will output to /dist/index.html)
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.html'],
                    dest: 'dist/'
                }]
            }
        },

        //  This will find any images in the src folder, minify them, and place the 
        //  minified versions into the dist folder, preserving directory structure.
        //  (ex. images in /src/img will go into /dist/img)
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },

        //  Watch certain files and when they change, execute some of the above plugins.
        watch: {
            compass: {
                files: ['<%= compass.dist.options.sassPath %>/*.scss'],
                tasks: ['compass:dev']
            }
        }
    });

    //  Load plugin(s).
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //  Default task(s), in this case it's to build for distribution/production.
    //  'imagemin' should be run before 'compass' so that Compass can build with the minified images.
    //  Also it's better to test the JS with JSHint before concatenating and compressing.
    grunt.registerTask('default', ['htmlmin', 'imagemin', 'compass', 'jshint', 'concat', 'uglify']);

};