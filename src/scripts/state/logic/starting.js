/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var Logic,
        instance,
        KEYCODE_SPACE = 32;

    Logic = function (options) {
        this.game = options.game;
        this.render = options.render;
        this.state = options.state;
    };

    Logic.prototype.createObjects = function (items) {
        var t = new createjs.Text("Hey! Press Space!", "50px Arial"),
            b = t.getBounds();
        t.x = this.render.width / 2 - b.width / 2;
        t.y = this.render.height / 2 - b.height / 2;
        items.push(t);
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