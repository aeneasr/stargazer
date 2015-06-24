/*global define */
define(['jquery', 'underscore', 'easel', 'model/player', 'generator/obstacle', 'generator/item', 'model/fuelbar', 'generator/planet', 'service/collision'], function ($, _, createjs, PlayerModel, ObstacleGenerator, ItemGenerator, FuelBarModel, PlanetGenerator, Collision) {
    'use strict';
    var Logic,
        instance,
        KEYCODE_SPACE = 32,
        KEYCODE_ESCAPE = 27;

    Logic = function (game, render, state) {
        this.game = game;
        this.render = render;
        this.state = state;
        this.points = 0;
    };

    Logic.prototype.tick = function (e) {
        instance.points += Math.floor(e.delta / 10);
        instance.fps.text = createjs.Ticker.getMeasuredFPS() | 0;
        instance.pointsText.text = instance.points;

        _.each(instance.backgrounds, function(v, k) {
            v.x -= e.delta / 20 * (k+1);
            if (v.x < - instance.render.width) {
                v.x = 0;
            }
        });

        _.each(instance.generator.objects, function(v) {
            var ticker = e.delta / 20;
            v.object.x -= v.velocity * ticker;
            if (Collision.checkPixelCollision(instance.player.object, v.object)) {
                console.log("death");
            }
            if (v.object.x < 0 - v.object.image.width) {
                instance.state.removeChild(v.object);
                instance.generator.removeObject(v);
            }
        });
    };


    Logic.prototype.createObjects = function (items) {
        this.points = 0;

        this.itemGenerator = new PlanetGenerator({state: this.state});
        this.background = new createjs.Bitmap('build/images/bg/0.png');
        this.backgrounds = [];
        for (var i = 5; i > 0; i--) {
            var b = new createjs.Shape(),
                img = document.createElement('img');
            img.src = 'build/images/bg/' + i + '.png';
            b.graphics.beginBitmapFill(img).drawRect(0, 0, this.render.width * 2, this.render.height).endFill();
            b.x = i * 100;
            this.backgrounds.push(b);
        }

        this.player = new PlayerModel(this.render);
        this.generator = new ObstacleGenerator({state: this.state});
        this.itemGenerator = new ItemGenerator({state: this.state});
        this.pointsText = new createjs.Text('0', '30px Arial');
        this.pointsText.x = 1800;

        this.fuelBox = new FuelBarModel(this.player);

        this.fps = new createjs.Text(createjs.Ticker.getFPS(), '30px Arial', '#000000');

        createjs.Ticker.addEventListener('tick', this.tick);
        items.push(this.background);
        _.each(this.backgrounds, function (v) {
            items.push(v);
        });
        items.push(this.fps);
        items.push(this.pointsText);
        items.push(this.fuelBox.getObject());
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
                instance = new Logic(game, render, state);
                return instance;
            }());
    };
});