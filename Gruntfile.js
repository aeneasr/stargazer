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
        rektbirds: config,
        watch: {
            compass: {
                files: ['<%= rektbirds.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer', 'clean:dist', 'copy:dist']
            },
            styles: {
                files: ['<%= rektbirds.app %>/styles/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer', 'clean:dist', 'copy:dist']
            },
            jsLang: {
                files: ['<%= rektbirds.app %>/lang/*'],
                tasks: ['i18n', 'clean:dist', 'copy:dist']
            },
            scripts: {
                files: ['<%= rektbirds.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint', 'copy:requirejs', 'requirejs:production', 'clean:dist', 'copy:dist']
            },
            images: {
                files: ['<%= rektbirds.app %>/images/{,*/}*.{png,jpg,jpeg}'],
                tasks: ['imagemin', 'clean:dist', 'copy:dist']
            },
            fonts: {
                files: ['<%= rektbirds.app %>/styles/fonts/*'],
                tasks: ['copy:tmp', 'clean:dist', 'copy:dist']
            }
        },
        clean: {
            tmp: {
                files: [{
                    dot: true,
                    src: [
                        '<%= rektbirds.tmp %>/*',
                        '!<%= rektbirds.tmp %>/.git*'
                    ]
                }]
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= rektbirds.dist %>/*',
                        '!<%= rektbirds.dist %>/.git*'
                    ]
                }]
            },
            server: '<%= rektbirds.tmp %>'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: [
                    '<%= rektbirds.app %>/scripts/thirdparty/{,*/}*.js',
                    '<%= rektbirds.app %>/scripts/modules/rektbirds_i18n.js',
                    '<%= rektbirds.app %>/scripts/libs/polyfills.js'
                ]
            },
            all: [
                '<%= rektbirds.app %>/scripts/{,*/}*.js'
            ]
        },
        compass: {
            options: {
                sassDir: '<%= rektbirds.app %>/styles',
                cssDir: '<%= rektbirds.tmp %>/styles',
                generatedImagesDir: '<%= rektbirds.tmp %>/images/generated',
                imagesDir: '<%= rektbirds.app %>/images',
                javascriptsDir: '<%= rektbirds.app %>/scripts',
                fontsDir: '<%= rektbirds.app %>/styles/fonts',
                importPath: '<%= rektbirds.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false
            },
            tmp: {
                options: {
                    generatedImagesDir: '<%= rektbirds.tmp %>/images/generated'
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
                    cwd: '<%= rektbirds.tmp %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= rektbirds.tmp %>/styles/'
                }]
            }
        },
        'bower-install': {
            app: {
                html: '<%= rektbirds.app %>/index.html',
                ignorePath: '<%= rektbirds.app %>/'
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
                //     '<%= rektbirds.tmp %>/scripts/main.js': '<%= rektbirds.tmp %>/scripts/main.js'
                // }
                files: [{
                    '<%= rektbirds.tmp %>/scripts/main.js': '<%= rektbirds.tmp %>/scripts/main.js',
                    '<%= rektbirds.tmp %>/bower_components/requirejs/require.js': '<%= rektbirds.tmp %>/bower_components/requirejs/require.js'
                }]
            }
        },
        imagemin: {
            tmp: {
                files: [{
                    expand: true,
                    cwd: '<%= rektbirds.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= rektbirds.tmp %>/images'
                }]
            }
        },
        svgmin: {
            tmp: {
                files: [{
                    expand: true,
                    cwd: '<%= rektbirds.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= rektbirds.tmp %>/images'
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: '<%= rektbirds.tmp %>/styles/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= rektbirds.tmp %>/styles/',
                ext: '.css'
            }
        },
        // Put files not handled in other tasks here
        copy: {
            tmp: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= rektbirds.app %>',
                    dest: '<%= rektbirds.tmp %>',
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
                    cwd: '<%= rektbirds.tmp %>',
                    dest: '<%= rektbirds.dist %>',
                    src: [
                        '**'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= rektbirds.app %>/styles',
                dest: '<%= rektbirds.tmp %>/styles/',
                src: '{,*/}*.css'
            },
            requirejs: {
                expand: true,
                dot: true,
                cwd: '<%= rektbirds.app %>/bower_components/requirejs',
                dest: '<%= rektbirds.tmp %>/bower_components/requirejs',
                src: 'require.js'
            },
            modernizr: {
                expand: true,
                dot: true,
                cwd: '<%= rektbirds.app %>/bower_components/modernizr',
                dest: '<%= rektbirds.tmp %>/bower_components/modernizr',
                src: 'modernizr.js'
            }
        },
        i18n: {
            src: ['<%= rektbirds.app %>/lang/*.json'],
            dest: '<%= rektbirds.app %>/scripts/modules/rektbirds_i18n.js'
        },
        modernizr: {
            devFile: '<%= rektbirds.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%= rektbirds.tmp %>/bower_components/modernizr/modernizr.js',
            files: [
                '<%= rektbirds.tmp %>/scripts/{,*/}*.js',
                '<%= rektbirds.tmp %>/styles/{,*/}*.css',
                '!<%= rektbirds.tmp %>/scripts/vendor/*'
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
                    baseUrl: "<%= rektbirds.app %>/scripts",
                    mainConfigFile: "src/scripts/main.js",
                    out: "<%= rektbirds.tmp %>/scripts/main.js",
                    preserveLicenseComments: false,
                    optimize: 'none'
                }
            },
            testing: {
                options: {
                    name: 'ATHENE2-TEST',
                    baseUrl: "<%= rektbirds.app %>/tests/modules",
                    mainConfigFile: "src/tests/modules/specRunner.js",
                    out: "<%= rektbirds.tmp %>/scripts/main.js",
                    preserveLicenseComments: false,
                    optimize: 'none'
                }
            }
        },
        "language-update": {
            src: [
                '<%= rektbirds.app %>/scripts/{,*/}*.js'
            ],
            langSrc: [
                '<%= rektbirds.app %>/lang/*.json'
            ],
            dest: '<%= rektbirds.app %>/lang-processed'
        },
        concat: {
            test: {
                src: [
                    '<%= rektbirds.app %>/bower_components/jasmine/lib/jasmine-core/jasmine.css',
                    '<%= rektbirds.tmp %>/styles/main.css'
                ],
                dest: '<%= rektbirds.tmp %>/styles/main.css'
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