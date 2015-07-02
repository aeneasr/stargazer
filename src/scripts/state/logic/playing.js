/*global define */
define(['jquery', 'underscore', 'easel', 'model/player', 'generator/obstacle', 'generator/item', 'model/fuelbar', 'generator/planet', 'service/collision'], function ($, _, createjs, PlayerModel, ObstacleGenerator, ItemGenerator, FuelBarModel, PlanetGenerator, Collision) {
    'use strict';
    var Logic,
        instance,
        KEYCODE_SPACE = 32,
        KEYCODE_ESCAPE = 27;

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

        _.each(instance.backgrounds, function (v, k) {
            if (k === 0) {
                v.x -= e.delta / 5;
                if (v.x < -2159) {
                    v.x = 0;
                }
            } else {
                v.x -= e.delta / 20 * (k + 1);
                if (v.x < -instance.render.width) {
                    v.x = 0;
                }
            }
        });

        _.each(instance.generator.objects, function (v) {
            var ticker = e.delta / 20;
            v.object.x -= v.velocity * ticker;
            if (Collision.checkPixelCollision(instance.player.object, v.object)) {
                instance.state.switchState('dying');
            }
            if (v.object.x < 0 - v.object.image.width) {
                instance.state.removeChild(v.object);
                instance.generator.removeObject(v);
            }
        });

        _.each(instance.itemGenerator.objects, function (v) {
            if (Collision.checkPixelCollision(instance.player.object, v.object)) {
                var type = v.type;
                if (type === 'points') {
                    instance.points += randInt(1000, 5000);
                } else if (type === 'fuel') {
                    instance.player.refill();
                }
                instance.state.removeChild(v.object);
            }
        });
    };


    Logic.prototype.createObjects = function (items) {
        this.points = 0;
        this.planetGenerator = new PlanetGenerator({state: this.state});
        this.background = new createjs.Bitmap('build/images/bg/0.png');
        this.background.zindex = -1;
        this.backgrounds = [];

        for (var i = 6; i > 0; i--) {
            var b = new createjs.Shape(),
                img = new Image(),
                self = this;
            img.src = 'build/images/bg/' + i + '.png';
            img.onload = function (b, img, self, i) {
                return function () {
                    var w = self.render.width * 2,
                        h = self.render.height;
                    if (i === 6) {
                        w = 2159;
                        h = 100;
                    }
                    b.graphics.beginBitmapFill(img, 'repeat-x').drawRect(0, 0, w * 2, h).endFill();
                };
            }(b, img, self, i);
            b.zindex = i;
            if (i === 6) {
                b.zindex = 10000;
            }
            b.x = i * 100;
            if (i === 6) {
                b.y = instance.render.height - 100;
                b.x = 0;
            }
            this.backgrounds.push(b);
        }

        this.player = new PlayerModel(this.render);
        this.generator = new ObstacleGenerator({state: this.state});
        this.itemGenerator = new ItemGenerator({state: this.state});
        this.pointsText = new createjs.Text('0', '30px Arial', '#ffffff');
        this.pointsText.x = 1800;
        this.pointsText.y = 20;

        this.fuelBox = new FuelBarModel(this.player);

        createjs.Ticker.addEventListener('tick', this.tick);
        items.push(this.background);
        _.each(this.backgrounds, function (v) {
            items.push(v);
        });
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
        this.planetGenerator.clear();
    };

    return function (game, render, state) {
        return instance || (function () {
                instance = new Logic(game, render, state);
                return instance;
            }());
    };
});