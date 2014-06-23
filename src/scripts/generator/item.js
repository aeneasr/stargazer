/*global define */
define(['jquery', 'underscore', 'easel', 'model/item'], function ($, _, createjs, ItemModel) {
    'use strict';
    var ItemGenerator,
        instance,
        Items;

    Items = [
        {
            name: 'brick',
            generate: function () {
                var circle = new createjs.Shape();
                circle.graphics.beginFill("red").drawCircle(0, 0, 5);
                return circle;
            },
            velocity: 7,
            chance: 0.8
        },
        {
            name: 'brick',
            generate: function () {
                var circle = new createjs.Shape();
                circle.graphics.beginFill("red").drawCircle(0, 0, 5);
                return circle;
            },
            velocity: 3,
            chance: 0.2
        }
    ];

    ItemGenerator = function (data) {
        var that = this;

        this.threshhold = 0;
        this.state = data.state;
        this.weights = [];
        this.startTime = new Date();

        _.each(Items, function (v) {
            that.weights.push(v.chance);
        });

        createjs.Ticker.addEventListener('tick', this.tick);
    };

    ItemGenerator.prototype.clear = function () {
        createjs.Ticker.removeEventListener('tick', this.tick);
    };

    ItemGenerator.prototype.rand = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    ItemGenerator.prototype.getRandomItem = function (list, weight) {
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

    ItemGenerator.prototype.tick = function (e) {
        var item,
            thing;

        instance.threshhold -= e.delta;

        if (instance.threshhold < 0) {
            instance.threshhold = Math.random() * 20000;
            item = instance.getRandomItem(Items, instance.weights);
            thing = item.generate();
            new ItemModel({
                object: thing,
                velocity: item.velocity * instance.rand(80, 100) / 100
            });
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