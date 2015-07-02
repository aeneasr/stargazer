/*global define */
define(['underscore', 'easel', 'model/BlinkText', 'model/backgrounds', 'sound'], function (_, createjs, BlinkText, Backgrounds) {
    'use strict';
    var Logic,
        instance,
        KEYCODE_SPACE = 32;

    Logic = function (options) {
        this.game = options.game;
        this.render = options.render;
        this.state = options.state;
    };

    Logic.prototype.tick = function (e) {
    };

    Logic.prototype.createObjects = function (items) {
        var t = new BlinkText(this.render, 'Ready for a challenge?\nPress Space!');
        this.background = new Backgrounds(this.render);
        _.each(this.background.objects, function (v) {
            items.push(v);
        });
        items.push(t.object);

        createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashAudioPlugin]);
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.on("fileload", createjs.proxy(function loadHandler() {
            var ppc = new createjs.PlayPropsConfig().set({loop: -1});
            //instance.bgmusic = createjs.Sound.play('bgmusic', ppc);
        }, (this)));
        createjs.Sound.registerSound('build/sound/stargazer.mp3', 'bgmusic');
    };

    Logic.prototype.keyUp = function (e) {
        if (e.keyCode === KEYCODE_SPACE) {
            instance.state.switchState('playing');
        }
    };

    Logic.prototype.clear = function () {
    };

    return function (game, render, state) {
        return instance || (function () {
                instance = new Logic({
                    game: game,
                    render: render,
                    state: state
                });
                return instance;
            }());
    };
});