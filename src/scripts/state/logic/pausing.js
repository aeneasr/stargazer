/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var Logic,
        instance,
        KEYCODE_SPACE = 32;

    Logic = function (game, render, state) {
        this.game = game;
        this.render = render;
        this.state = state;
    };

    Logic.prototype.createObjects = function (items) {
        items.push(new createjs.Text("Such pause", "50px Arial"));
    };

    Logic.prototype.keyUp = function (e) {
        console.log(instance.state);
        if (e.keyCode === KEYCODE_SPACE) {
            instance.state.switchState('playing');
        }
    };

    Logic.prototype.clear = function () {
    };

    // Logic.prototype.tick = function (e) {
    // };

    return function (game, render, state) {
        return instance || (function () {
            instance = new Logic(game, render, state);
            return instance;
        }());
    };
});