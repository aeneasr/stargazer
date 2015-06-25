/*global define */
define(['jquery', 'underscore', 'easel', 'model/obstacle'], function ($, _, createjs, ObstacleModel) {
    'use strict';
    var ObstacleGenerator,
        instance,
        Obstacles;

    Obstacles = [
        {
            name: 'brick',
            generate: function () {
                var b = new createjs.Bitmap('build/images/planets/0.png');
                b.scaleX = 0.2;
                b.scaleY = 0.2;
                return b;
            },
            velocity: 5,
            chance: 0.2
        },
        {
            name: 'brick',
            generate: function () {
                var b = new createjs.Bitmap('build/images/planets/1.png');
                b.scaleX = 0.1;
                b.scaleY = 0.1;
                return b;
            },
            velocity: 7,
            chance: 0.8
        },
        {
            name: 'brick',
            generate: function () {
                var b = new createjs.Bitmap('build/images/planets/2.png');
                b.scaleX = 0.3;
                b.scaleY = 0.3;
                return b;
            },
            velocity: 3,
            chance: 0.2
        }
    ];

    ObstacleGenerator = function (data) {
        var that = this;

        this.threshhold = 0;
        this.state = data.state;
        this.weights = [];
        this.startTime = new Date();
        this.objects = [];

        _.each(Obstacles, function (v) {
            that.weights.push(v.chance);
        });

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

    ObstacleGenerator.prototype.getRandomItem = function (list, weight) {
        var total_weight = weight.reduce(function (prev, cur) {
                return prev + cur;
            }), random_num = this.rand(0, total_weight),
            weight_sum = 0,
            i;

        for (i = 0; i < list.length; i++) {
            weight_sum += weight[i];
            weight_sum = +weight_sum.toFixed(2);

            if (random_num <= weight_sum) {
                return list[i];
            }
        }

        return list[0];
    };

    ObstacleGenerator.prototype.tick = function (e) {
        var item,
            thing,
            elapsed = 0;

        instance.threshhold -= e.delta / 5;

        if (instance.threshhold < 0) {
            instance.threshhold = Math.random() * 500;

            item = instance.getRandomItem(Obstacles, instance.weights);

            elapsed = Math.floor((new Date() - instance.startTime) / 1000 / 60 * 7);

            if (elapsed < 0.5) {
                elapsed = 1;
            }

            if (elapsed > 2) {
                elapsed = 2;
            }

            thing = item.generate();
            var m = new ObstacleModel({
                object: thing,
                velocity: item.velocity * elapsed * instance.rand(80, 100) / 100,
                states: instance.state
            });
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