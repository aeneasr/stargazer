/*global require*/
require.config({
    name: 'RektBirds',
    baseUrl: "/build/scripts",
    paths: {
        "jquery": "../bower_components/jquery/jquery",
        "jquery-ui" : "../bower_components/jquery-ui/ui/jquery-ui",
        "underscore": "../bower_components/underscore/underscore",
        "bootstrap": "../bower_components/sass-bootstrap/dist/js/bootstrap"
    },
    shim: {
        underscore: {
            exports: '_'
        },
        bootstrap: {
            deps: ['jquery']
        },
        RektBirds: {
            deps: ['bootstrap']
        }
    },
    waitSeconds: 2
});