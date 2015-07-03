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
        stargazer: config,
        watch: {
            compass: {
                files: ['<%= stargazer.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer', 'clean:dist', 'copy:dist', 'copy:images', 'copy:sounds']
            },
            styles: {
                files: ['<%= stargazer.app %>/styles/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer', 'clean:dist', 'copy:dist', 'copy:images', 'copy:sounds']
            },
            jsLang: {
                files: ['<%= stargazer.app %>/lang/*'],
                tasks: ['i18n', 'clean:dist', 'copy:dist', 'copy:images']
            },
            scripts: {
                files: ['<%= stargazer.app %>/scripts/{,*/}*.js', '<%= stargazer.app %>/**/*.js'],
                tasks: ['jshint', 'copy:requirejs', 'requirejs:production', 'clean:dist', 'copy:dist', 'copy:images', 'copy:sounds'],
                options: {
                    // Start a live reload server on the default port 35729
                    livereload: true
                }
            },
            images: {
                files: ['<%= stargazer.app %>/images/{,*/}*.{png,jpg,jpeg}', '<%= stargazer.app %>/images/**/*.{png,jpg,jpeg}'],
                tasks: ['imagemin', 'clean:dist', 'copy:dist', 'copy:images', 'copy:sounds']
            },
            fonts: {
                files: ['<%= stargazer.app %>/styles/fonts/*'],
                tasks: ['copy:tmp', 'clean:dist', 'copy:dist', 'copy:images', 'copy:sounds']
            },
            sounds: {
                files: ['<%= stargazer.app %>/sound/{,*/}*.{mp3,ogg}'],
                tasks: ['copy:sounds']
            },
        },
        clean: {
            tmp: {
                files: [{
                    dot: true,
                    src: [
                        '<%= stargazer.tmp %>/*',
                        '!<%= stargazer.tmp %>/.git*'
                    ]
                }]
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= stargazer.dist %>/*',
                        '!<%= stargazer.dist %>/.git*'
                    ]
                }]
            },
            server: '<%= stargazer.tmp %>'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: [
                    '<%= stargazer.app %>/scripts/thirdparty/{,*/}*.js',
                    '<%= stargazer.app %>/scripts/modules/stargazer_i18n.js',
                    '<%= stargazer.app %>/scripts/libs/polyfills.js'
                ]
            },
            all: [
                '<%= stargazer.app %>/scripts/{,*/}*.js'
            ]
        },
        compass: {
            options: {
                sassDir: '<%= stargazer.app %>/styles',
                cssDir: '<%= stargazer.tmp %>/styles',
                generatedImagesDir: '<%= stargazer.tmp %>/images/generated',
                imagesDir: '<%= stargazer.app %>/images',
                javascriptsDir: '<%= stargazer.app %>/scripts',
                fontsDir: '<%= stargazer.app %>/styles/fonts',
                importPath: '<%= stargazer.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false
            },
            tmp: {
                options: {
                    generatedImagesDir: '<%= stargazer.tmp %>/images/generated'
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
                    cwd: '<%= stargazer.tmp %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= stargazer.tmp %>/styles/'
                }]
            }
        },
        'bower-install': {
            app: {
                html: '<%= stargazer.app %>/index.html',
                ignorePath: '<%= stargazer.app %>/'
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
                //     '<%= stargazer.tmp %>/scripts/main.js': '<%= stargazer.tmp %>/scripts/main.js'
                // }
                files: [{
                    '<%= stargazer.tmp %>/scripts/main.js': '<%= stargazer.tmp %>/scripts/main.js',
                    '<%= stargazer.tmp %>/bower_components/requirejs/require.js': '<%= stargazer.tmp %>/bower_components/requirejs/require.js'
                }]
            }
        },
        imagemin: {
            tmp: {
                files: [{
                    expand: true,
                    cwd: '<%= stargazer.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= stargazer.tmp %>/images'
                }]
            }
        },
        svgmin: {
            tmp: {
                files: [{
                    expand: true,
                    cwd: '<%= stargazer.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= stargazer.tmp %>/images'
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: '<%= stargazer.tmp %>/styles/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= stargazer.tmp %>/styles/',
                ext: '.css'
            }
        },
        // Put files not handled in other tasks here
        copy: {
            tmp: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= stargazer.app %>',
                    dest: '<%= stargazer.tmp %>',
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
                    cwd: '<%= stargazer.tmp %>',
                    dest: '<%= stargazer.dist %>',
                    src: [
                        '**'
                    ]
                }]
            },
            images: {
                expand: true,
                dot: true,
                cwd: '<%= stargazer.app %>/images',
                dest: '<%= stargazer.dist %>/images/',
                src: '**/*.{png,jpg,jpeg,svg}'
            },
            sounds: {
                expand: true,
                dot: true,
                cwd: '<%= stargazer.app %>/sound',
                dest: '<%= stargazer.dist %>/sound/',
                src: '{,*/}*.{mp3,ogg}'
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= stargazer.app %>/styles',
                dest: '<%= stargazer.tmp %>/styles/',
                src: '{,*/}*.css'
            },
            requirejs: {
                expand: true,
                dot: true,
                cwd: '<%= stargazer.app %>/bower_components/requirejs',
                dest: '<%= stargazer.tmp %>/bower_components/requirejs',
                src: 'require.js'
            },
            modernizr: {
                expand: true,
                dot: true,
                cwd: '<%= stargazer.app %>/bower_components/modernizr',
                dest: '<%= stargazer.tmp %>/bower_components/modernizr',
                src: 'modernizr.js'
            }
        },
        i18n: {
            src: ['<%= stargazer.app %>/lang/*.json'],
            dest: '<%= stargazer.app %>/scripts/modules/stargazer_i18n.js'
        },
        modernizr: {
            devFile: '<%= stargazer.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%= stargazer.tmp %>/bower_components/modernizr/modernizr.js',
            files: [
                '<%= stargazer.tmp %>/scripts/{,*/}*.js',
                '<%= stargazer.tmp %>/styles/{,*/}*.css',
                '!<%= stargazer.tmp %>/scripts/vendor/*'
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
                    baseUrl: "<%= stargazer.app %>/scripts",
                    mainConfigFile: "src/scripts/main.js",
                    out: "<%= stargazer.tmp %>/scripts/main.js",
                    preserveLicenseComments: false,
                    optimize: 'none'
                }
            },
            testing: {
                options: {
                    name: 'ATHENE2-TEST',
                    baseUrl: "<%= stargazer.app %>/tests/modules",
                    mainConfigFile: "src/tests/modules/specRunner.js",
                    out: "<%= stargazer.tmp %>/scripts/main.js",
                    preserveLicenseComments: false,
                    optimize: 'none'
                }
            }
        },
        "language-update": {
            src: [
                '<%= stargazer.app %>/scripts/{,*/}*.js'
            ],
            langSrc: [
                '<%= stargazer.app %>/lang/*.json'
            ],
            dest: '<%= stargazer.app %>/lang-processed'
        },
        concat: {
            test: {
                src: [
                    '<%= stargazer.app %>/bower_components/jasmine/lib/jasmine-core/jasmine.css',
                    '<%= stargazer.tmp %>/styles/main.css'
                ],
                dest: '<%= stargazer.tmp %>/styles/main.css'
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
            'copy:sounds',
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
        'copy:sounds',
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