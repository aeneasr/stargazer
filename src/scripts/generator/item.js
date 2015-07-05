/*global define */
define(['jquery', 'underscore', 'easel', 'model/item', 'service/list'], function ($, _, createjs, ItemModel, WeightedList) {
    'use strict';
    var ItemGenerator,
        instance,
        Items;

    Items = [
        {
            name: 'fuel',
            generate: function () {
                var spriteSheet = new createjs.SpriteSheet({
                    images: [
                        'build/images/upgrades/01_Upgrade.png',
                        'build/images/upgrades/02_Upgrade.png',
                        'build/images/upgrades/03_Upgrade.png'
                    ],
                    frames: {
                        width: 120,
                        height: 104
                    },
                    animations: {
                        pulse: [0, 2, 'pulse', 0.089]
                    }
                });
                return new createjs.Sprite(spriteSheet, 'pulse');
            },
            velocity: 7,
            weight: 4
        },
        {
            name: 'points',
            generate: function () {
                var spriteSheet = new createjs.SpriteSheet({
                    images: [
                        'build/images/upgrades/04_Upgrade.png',
                        'build/images/upgrades/05_Upgrade.png',
                        'build/images/upgrades/06_Upgrade.png'
                    ],
                    frames: {
                        width: 120,
                        height: 104
                    },
                    animations: {
                        pulse: [0, 2, 'pulse', 0.089]
                    }
                });
                return new createjs.Sprite(spriteSheet, 'pulse');
            },
            velocity: 4,
            weight: 1
        }
    ];

    ItemGenerator = function (data) {
        this.threshhold = 0;
        this.state = data.state;
        this.startTime = new Date();
        this.objects = [];
        this.weightedList = new WeightedList(Items);

        createjs.Ticker.addEventListener('tick', this.tick);
    };

    ItemGenerator.prototype.clear = function () {
        createjs.Ticker.removeEventListener('tick', this.tick);
    };

    ItemGenerator.prototype.rand = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    ItemGenerator.prototype.tick = function (e) {
        var item, thing, m, elapsed;

        instance.threshhold -= e.delta;

        if (instance.threshhold < 0) {
            elapsed = Math.floor((new Date() - instance.startTime) / 1000 / 60 * 7);
            if (elapsed < 0.5) {
                elapsed = 0.5;
            } else if (elapsed > 2) {
                elapsed = 2;
            }
            instance.threshhold = 3000 * elapsed + Math.random() * 2000;
            item = instance.weightedList.get();
            thing = item.generate();
            m = new ItemModel({
                object: thing,
                velocity: item.velocity * instance.rand(80, 100) / 100,
                states: instance.state,
                type: item.name
            });
            instance.objects.push(m);
            instance.state.addChild(thing);
        }
    };


    return function (data) {
        return (function () {
            instance = new ItemGenerator(data);
            return instance;
        }());
    };
});
