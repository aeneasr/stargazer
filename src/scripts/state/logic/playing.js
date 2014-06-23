/*global define */
define(['jquery', 'underscore', 'easel', 'model/player', 'generator/obstacle', 'generator/item'], function ($, _, createjs, PlayerModel, ObstacleGenerator, ItemGenerator) {
    'use strict';
    var Logic,
        instance,
        KEYCODE_SPACE = 32,
        KEYCODE_ESCAPE = 27;

    Logic = function (options) {
        this.game = options.game;
        this.render = options.render;
        this.state = options.state;
        this.points = 0;
    };

    Logic.prototype.tick = function (e) {
        instance.points += Math.floor(e.delta / 10);
        instance.pointsText.text = instance.points;

        if (instance.player.getObject().y < 0 || instance.player.getObject().y > 1080) {
            // instance.state.switchState('dying');
        }
    };


    Logic.prototype.createObjects = function (items) {
        this.points = 0;
        this.player = new PlayerModel();
        this.pointsText = new createjs.Text('0', '30px Arial');
        this.pointsText.x = 1800;
        this.generator = new ObstacleGenerator({state: this.state});
        this.itemGenerator = new ItemGenerator({state: this.state});

        createjs.Ticker.addEventListener('tick', this.tick);
        items.push(this.pointsText);
        items.push(this.player.getObject());
    };

    Logic.prototype.keyUp = function (e) {
        if (e.keyCode === KEYCODE_ESCAPE) {
            instance.state.switchState('pausing');
        } else if (e.keyCode === KEYCODE_SPACE) {
            instance.player.push(10);
            return false;
        }
    };

    Logic.prototype.clear = function () {
        createjs.Ticker.removeEventListener('tick', this.tick);
        this.generator.clear();
        this.itemGenerator.clear();
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