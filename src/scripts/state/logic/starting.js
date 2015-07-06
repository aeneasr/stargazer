/*global define */
define(['underscore', 'easel', 'model/BlinkText', 'model/backgrounds', 'service/music', 'sound'], function (_, createjs, BlinkText, Backgrounds, Music) {
    'use strict';
    var Logic,
        instance,
        KEYCODE_SPACE = 32,
        music = new Music();

    Logic = function (options) {
        this.game = options.game;
        this.render = options.render;
        this.state = options.state;
    };

    Logic.prototype.tick = function (e) {
    };

    Logic.prototype.createObjects = function (items) {
        var t = new BlinkText(this.render, 'Welcome, stargazer!\nReady for a challenge?\nPress space or tap!');
        this.background = new Backgrounds(this.render);
        _.each(this.background.objects, function (v) {
            items.push(v);
        });
        items.push(t.object);

        this.versionText = new createjs.Text('0.0.5', '20px "Lucida Console", "Lucida Sans Typewriter", monaco, "Bitstream Vera Sans Mono", monospace', '#ffffff');
        this.versionText.x = this.render.width/2;
        this.versionText.textAlign = 'center';
        this.versionText.y = this.render.height - 200;
        items.push(this.versionText);

        createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashAudioPlugin]);
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.on("fileload", createjs.proxy(function loadHandler() {
            var ppc = new createjs.PlayPropsConfig().set({loop: -1});
            music.addChannel(createjs.Sound.play('bgmusic', ppc));
        }, (this)));
        createjs.Sound.registerSound('build/sound/stargazer.mp3', 'bgmusic');
    };

    Logic.prototype.keyDown = function (e) {
        if (e.keyCode === KEYCODE_SPACE) {
            instance.state.switchState('playing');
        } else if (e.keyCode === KEYCODE_M) {
            music.toggleAll();
            return false;
        }
    };

    Logic.prototype.mouseDown = function () {
        instance.state.switchState('playing');
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