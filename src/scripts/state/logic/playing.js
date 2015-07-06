/*global define */
define(['jquery', 'underscore', 'easel', 'model/player', 'generator/obstacle', 'generator/item', 'model/fuelbar', 'generator/planet', 'service/collision', 'model/backgrounds'], function ($, _, createjs, PlayerModel, ObstacleGenerator, ItemGenerator, FuelBarModel, PlanetGenerator, Collision, Backgrounds) {
    'use strict';
    var Logic,
        instance,
        KEYCODE_SPACE = 32,
        KEYCODE_ESCAPE = 27,
        groundHeight = 100;

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    Logic = function (game, render, state) {
        this.game = game;
        this.render = render;
        this.state = state;
        this.points = 0;
    };

    Logic.prototype.tick = function (e) {
        instance.points += Math.floor(e.delta / 10);
        instance.pointsText.text = instance.points;

        _.each(instance.generator.objects, function (v) {
            var ticker = e.delta / 20 * 5;
            v.object.x -= v.velocity * ticker;
            if (Collision.checkPixelCollision(instance.player.object, v.object)) {
                instance.state.switchState('dying');
            }
            if (v.object.x < 0 - v.width) {
                instance.state.removeChild(v.object);
                instance.generator.removeObject(v);
            }
        });

        _.each(instance.itemGenerator.objects, function (v) {
            if (Collision.checkPixelCollision(instance.player.object, v.object)) {
                var type = v.type;
                if (v.used){
                    return;
                }
                v.used = true;
                if (type === 'points') {
                    instance.points += randInt(1000, 2000);
                } else if (type === 'fuel') {
                    instance.player.refill();
                    instance.points += randInt(50, 100);
                }
                instance.state.removeChild(v.object);
            }
        });
    };


    Logic.prototype.createObjects = function (items) {
        this.points = 0;
        //this.planetGenerator = new PlanetGenerator({state: this.state});
        this.backgrounds = new Backgrounds(this.render, true, groundHeight);

        this.player = new PlayerModel(this.state, this.render, groundHeight);
        this.generator = new ObstacleGenerator({state: this.state, render: this.render});
        this.itemGenerator = new ItemGenerator({state: this.state});
        this.pointsText = new createjs.Text('0', '30px "Lucida Console"', '#ffffff');
        this.pointsText.x = 1800;
        this.pointsText.y = 20;

        this.fuelBox = new FuelBarModel(this.player);

        createjs.Ticker.addEventListener('tick', this.tick);
        _.each(this.backgrounds.objects, function (v) {
            items.push(v);
        });
        items.push(this.pointsText);
        items.push(this.fuelBox.getObject());
        items.push(this.player.getObject());
        items.push(this.background);
    };

    Logic.prototype.keyDown = function (e) {
        if (e.keyCode === KEYCODE_SPACE) {
            instance.player.push(10);
            return false;
        }
    };

    Logic.prototype.mouseDown = function () {
        instance.player.push(10);
    };

    Logic.prototype.clear = function () {
        //createjs.Ticker.removeEventListener('tick', this.tick);
        this.player.clear();
        this.generator.clear();
        this.itemGenerator.clear();
    };

    return function (game, render, state) {
        return instance || (function () {
                instance = new Logic(game, render, state);
                return instance;
            }());
    };
});