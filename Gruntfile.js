'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var config = {
        app: 'src',
        dist: 'app/build',
        tmp: 'tmp'
    };

    grunt.initConfig({
        stormcall: config,
        watch: {
            compass: {
                files: ['<%= stormcall.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer', 'clean:dist', 'copy:dist', 'copy:images']
            },
            styles: {
                files: ['<%= stormcall.app %>/styles/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer', 'clean:dist', 'copy:dist', 'copy:images']
            },
            jsLang: {
                files: ['<%= stormcall.app %>/lang/*'],
                tasks: ['i18n', 'clean:dist', 'copy:dist', 'copy:images']
            },
            scripts: {
                files: ['<%= stormcall.app %>/scripts/{,*/}*.js', '<%= stormcall.app %>/**/*.js'],
                tasks: ['jshint', 'copy:requirejs', 'requirejs:production', 'clean:dist', 'copy:dist', 'copy:images'],
                options: {
                    // Start a live reload server on the default port 35729
                    livereload: true
                }
            },
            images: {
                files: ['<%= stormcall.app %>/images/{,*/}*.{png,jpg,jpeg}'],
                tasks: ['imagemin', 'clean:dist', 'copy:dist', 'copy:images']
            },
            fonts: {
                files: ['<%= stormcall.app %>/styles/fonts/*'],
                tasks: ['copy:tmp', 'clean:dist', 'copy:dist', 'copy:images']
            }
        },
        clean: {
            tmp: {
                files: [{
                    dot: true,
                    src: [
                        '<%= stormcall.tmp %>/*',
                        '!<%= stormcall.tmp %>/.git*'
                    ]
                }]
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= stormcall.dist %>/*',
                        '!<%= stormcall.dist %>/.git*'
                    ]
                }]
            },
            server: '<%= stormcall.tmp %>'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: [
                    '<%= stormcall.app %>/scripts/thirdparty/{,*/}*.js',
                    '<%= stormcall.app %>/scripts/modules/stormcall_i18n.js',
                    '<%= stormcall.app %>/scripts/libs/polyfills.js'
                ]
            },
            all: [
                '<%= stormcall.app %>/scripts/{,*/}*.js'
            ]
        },
        compass: {
            options: {
                sassDir: '<%= stormcall.app %>/styles',
                cssDir: '<%= stormcall.tmp %>/styles',
                generatedImagesDir: '<%= stormcall.tmp %>/images/generated',
                imagesDir: '<%= stormcall.app %>/images',
                javascriptsDir: '<%= stormcall.app %>/scripts',
                fontsDir: '<%= stormcall.app %>/styles/fonts',
                importPath: '<%= stormcall.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false
            },
            tmp: {
                options: {
                    generatedImagesDir: '<%= stormcall.tmp %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            tmp: {
                files: [{
                    expand: true,
                    cwd: '<%= stormcall.tmp %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= stormcall.tmp %>/styles/'
                }]
            }
        },
        'bower-install': {
            app: {
                html: '<%= stormcall.app %>/index.html',
                ignorePath: '<%= stormcall.app %>/'
            }
        },
        uglify: {
            tmp: {
                options: {
                    banner: '',
                    output: {
                        beautify: false
                    },
                    compress: {
                        sequences: true,
                        global_defs: {
                            DEBUG: true
                        }
                    },
                    warnings: true,
                    mangle: true
                },
                // files: {
                //     '<%= stormcall.tmp %>/scripts/main.js': '<%= stormcall.tmp %>/scripts/main.js'
                // }
                files: [{
                    '<%= stormcall.tmp %>/scripts/main.js': '<%= stormcall.tmp %>/scripts/main.js',
                    '<%= stormcall.tmp %>/bower_components/requirejs/require.js': '<%= stormcall.tmp %>/bower_components/requirejs/require.js'
                }]
            }
        },
        imagemin: {
            tmp: {
                files: [{
                    expand: true,
                    cwd: '<%= stormcall.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= stormcall.tmp %>/images'
                }]
            }
        },
        svgmin: {
            tmp: {
                files: [{
                    expand: true,
                    cwd: '<%= stormcall.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= stormcall.tmp %>/images'
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: '<%= stormcall.tmp %>/styles/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= stormcall.tmp %>/styles/',
                ext: '.css'
            }
        },
        // Put files not handled in other tasks here
        copy: {
            tmp: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= stormcall.app %>',
                    dest: '<%= stormcall.tmp %>',
                    src: [
                        '.htaccess',
                        'styles/fonts/{,*/}*.*',
                        'bower_components/jquery/jquery.min.map'
                    ]
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= stormcall.tmp %>',
                    dest: '<%= stormcall.dist %>',
                    src: [
                        '**'
                    ]
                }]
            },
            images: {
                expand: true,
                dot: true,
                cwd: '<%= stormcall.app %>/images',
                dest: '<%= stormcall.dist %>/images/',
                src: '{,*/}*.{png,jpg,jpeg,svg}'
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= stormcall.app %>/styles',
                dest: '<%= stormcall.tmp %>/styles/',
                src: '{,*/}*.css'
            },
            requirejs: {
                expand: true,
                dot: true,
                cwd: '<%= stormcall.app %>/bower_components/requirejs',
                dest: '<%= stormcall.tmp %>/bower_components/requirejs',
                src: 'require.js'
            },
            modernizr: {
                expand: true,
                dot: true,
                cwd: '<%= stormcall.app %>/bower_components/modernizr',
                dest: '<%= stormcall.tmp %>/bower_components/modernizr',
                src: 'modernizr.js'
            }
        },
        i18n: {
            src: ['<%= stormcall.app %>/lang/*.json'],
            dest: '<%= stormcall.app %>/scripts/modules/stormcall_i18n.js'
        },
        modernizr: {
            devFile: '<%= stormcall.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%= stormcall.tmp %>/bower_components/modernizr/modernizr.js',
            files: [
                '<%= stormcall.tmp %>/scripts/{,*/}*.js',
                '<%= stormcall.tmp %>/styles/{,*/}*.css',
                '!<%= stormcall.tmp %>/scripts/vendor/*'
            ],
            uglify: true
        },
        concurrent: {
            server: [
                'compass',
                'copy:styles',
                'copy:requirejs'
            ],
            test: [
                'copy:styles',
                'copy:requirejs'
            ],
            tmp: [
                'compass',
                'copy:styles',
                'copy:requirejs',
                'svgmin'
            ],
            dist: [
                'copy:dist'
            ]
        },
        requirejs: {
            production: {
                options: {
                    baseUrl: "<%= stormcall.app %>/scripts",
                    mainConfigFile: "src/scripts/main.js",
                    out: "<%= stormcall.tmp %>/scripts/main.js",
                    preserveLicenseComments: false,
                    optimize: 'none'
                }
            },
            testing: {
                options: {
                    name: 'ATHENE2-TEST',
                    baseUrl: "<%= stormcall.app %>/tests/modules",
                    mainConfigFile: "src/tests/modules/specRunner.js",
                    out: "<%= stormcall.tmp %>/scripts/main.js",
                    preserveLicenseComments: false,
                    optimize: 'none'
                }
            }
        },
        "language-update": {
            src: [
                '<%= stormcall.app %>/scripts/{,*/}*.js'
            ],
            langSrc: [
                '<%= stormcall.app %>/lang/*.json'
            ],
            dest: '<%= stormcall.app %>/lang-processed'
        },
        concat: {
            test: {
                src: [
                    '<%= stormcall.app %>/bower_components/jasmine/lib/jasmine-core/jasmine.css',
                    '<%= stormcall.tmp %>/styles/main.css'
                ],
                dest: '<%= stormcall.tmp %>/styles/main.css'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: './app/',
                    open: true
                }
            }
        }
    });

    grunt.registerTask('dev', function (target) {
        if (target === 'tmp') {
            return grunt.task.run(['build']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'copy:requirejs',
            'requirejs:production',
            'copy:tmp',
            'copy:modernizr',
            'clean:dist',
            'copy:dist',
            'copy:images',
            'connect',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:tmp',
        'concurrent:tmp',
        'autoprefixer',
        'copy:tmp',
        'cssmin',
        'imagemin',
        'requirejs:production',
        'modernizr',
        'uglify',
        'clean:dist',
        'copy:dist',
        'clean:tmp'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);

    grunt.registerTask('test', [
        'requirejs:testing',
        'concat:test'
    ]);
};