/*global require*/
require.config({
    name: 'RektBirds',
    baseUrl: "/build/scripts",
    paths: {
        "jquery": "../bower_components/jquery/jquery",
        "jquery-ui" : "../bower_components/jquery-ui/ui/jquery-ui",
        "underscore": "../bower_components/underscore/underscore",
        "bootstrap": "../bower_components/sass-bootstrap/dist/js/bootstrap",
        "easel": "../bower_components/EaselJS/lib/easeljs-0.7.1.min",
        //"preload": "../bower_components/PreloadJS/lib/preloadjs-0.4.1.min",
        //"sound": "../bower_components/SoundJS/lib/soundjs-0.5.2.min",
        "tween": "../bower_components/TweenJS/lib/tweenjs-0.5.1.min",
        "render_service" : "service/render",
        "game_service" : "service/game",
        "game_states" : "state/game"
    },
    shim: {
        underscore: {
            exports: '_'
        },
        bootstrap: {
            deps: ['jquery']
        },
        easel: {
            exports: 'createjs'
        },
        tween: {
            deps: ['easel'],
            exports: 'Tween'
        },
        RektBirds: {
            deps: ['bootstrap']
        }
    },
    waitSeconds: 2
});