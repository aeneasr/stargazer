/*global define */
define(['jquery', 'underscore', 'easel', 'model/obstacle', 'service/list'], function ($, _, createjs, ObstacleModel, WeightedList) {
    'use strict';
    var ObstacleGenerator,
        instance,
        Obstacles;

    Obstacles = [
        {
            name: 'brick',
            generate: function () {
                var spriteSheet = new createjs.SpriteSheet({
                    images: [
                        'build/images/obstacles/aster/03_Aster.png',
                        'build/images/obstacles/aster/04_Aster.png',
                        'build/images/obstacles/aster/05_Aster.png'
                    ],
                    frames: {
                        width: 80,
                        height: 40
                    },
                    animations: {
                        pulse: [0, 2, 'pulse', 0.089]
                    }
                });
                return new createjs.Sprite(spriteSheet, 'pulse');
            },
            velocity: 2,
            width: 80,
            weight: 1
        },
        {
            name: 'brick',
            generate: function () {
                var spriteSheet = new createjs.SpriteSheet({
                    images: [
                        'build/images/obstacles/bullet/01_Bullet.png',
                        'build/images/obstacles/bullet/02_Bullet.png'
                    ],
                    frames: {
                        width: 112,
                        height: 32
                    },
                    animations: {
                        pulse: [0, 1, 'pulse', 0.089]
                    }
                });
                return new createjs.Sprite(spriteSheet, 'pulse');
            },
            velocity: 2.2,
            width: 112,
            weight: 3
        },
        {
            name: 'brick',
            generate: function () {
                var spriteSheet = new createjs.SpriteSheet({
                    images: [
                        'build/images/obstacles/ground/01_Lava.png',
                        'build/images/obstacles/ground/02_Lava.png'
                    ],
                    frames: {
                        width: 104,
                        height: 96
                    },
                    animations: {
                        pulse: [0, 1, 'pulse', 0.089]
                    }
                });
                return new createjs.Sprite(spriteSheet, 'pulse');
            },
            velocity: 1,
            ground: true,
            y: -196,
            width: 104,
            weight: 2
        },
        {
            name: 'brick',
            generate: function () {
                var spriteSheet = new createjs.SpriteSheet({
                    images: [
                        'build/images/obstacles/ground/03_Lava_S.png',
                        'build/images/obstacles/ground/04_Lava_S.png'
                    ],
                    frames: {
                        width: 72,
                        height: 40
                    },
                    animations: {
                        pulse: [0, 1, 'pulse', 0.089]
                    }
                });
                return new createjs.Sprite(spriteSheet, 'pulse');
            },
            velocity: 1,
            width: 72,
            y: -140,
            ground: true,
            weight: 2
        }
    ];

    ObstacleGenerator = function (data) {
        this.threshhold = 0;
        this.state = data.state;
        this.startTime = new Date();
        this.objects = [];
        this.render = data.render;
        this.weightedList = new WeightedList(Obstacles);

        createjs.Ticker.addEventListener('tick', this.tick);
    };

    ObstacleGenerator.prototype.removeObject = function (object) {
        var index = this.objects.indexOf(object);
        if (index > -1) {
            this.objects.splice(index, 1);
        }
    };

    ObstacleGenerator.prototype.clear = function () {
        createjs.Ticker.removeEventListener('tick', this.tick);
    };

    ObstacleGenerator.prototype.rand = function (min, max) {
        return Math.random() * (max - min) + min;
    };


    ObstacleGenerator.prototype.tick = function (e) {
        var item,
            thing,
            elapsed = 0, data;

        instance.threshhold -= e.delta;

        if (instance.threshhold < 0) {
            item = instance.weightedList.get();
            elapsed = (new Date() - instance.startTime) / 1000 / 30 + 0.5;
            console.log(elapsed);
            if (elapsed < 0.7) {
                elapsed = 0.7;
            } else if (elapsed > 2.8) {
                elapsed = 2.8;
            }
            instance.threshhold = (500 + Math.random() * 2000) / elapsed;
            if (elapsed > 2.4) {
                elapsed = 2.4;
            }
            console.log(elapsed);

            thing = item.generate();
            data = {
                object: thing,
                velocity: item.velocity * instance.rand(80, 100) / 100 * elapsed,
                states: instance.state,
                type: item.name
            };
            if (item.ground) {
                data['y'] = instance.render.height + item.y;
                data['velocity'] = item.velocity;
            }
            var m = new ObstacleModel(data);
            instance.state.addChild(thing);
            instance.objects.push(m);
        }
    };


    return function (data) {
        return (function () {
            instance = new ObstacleGenerator(data);
            return instance;
        }());
    };
});