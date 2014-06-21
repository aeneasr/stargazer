/*global define */
define(['jquery', 'underscore', 'easel', 'model/player', 'generator/obstacle'], function ($, _, createjs, PlayerModel, ObstacleGenerator) {
    'use strict';
    var Logic,
        instance,
        KEYCODE_SPACE = 32,
        KEYCODE_ESCAPE = 27;

    Logic = function (options) {
        this.game = options.game;
        this.render = options.render;
        this.state = options.state;
        this.generator = new ObstacleGenerator({state: this.state});
    };

    Logic.prototype.createObjects = function (items) {
        this.player = new PlayerModel();

        items.push(this.player.getObject());
    };

    Logic.prototype.keyUp = function (e) {
        if (e.keyCode === KEYCODE_ESCAPE) {
            instance.state.switchState('pausing');
        } else if (e.keyCode === KEYCODE_SPACE) {
            instance.player.push(10);
        }
    };

    Logic.prototype.clear = function () {
        this.generator.clear();
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