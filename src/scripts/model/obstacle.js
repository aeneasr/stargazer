/*global define */
define([], function () {
    'use strict';
    // TODO Pass states down from generator instead
    var Obstacle;

    Obstacle = function (data) {
        this.states = data.states;
        this.velocity = data.velocity;
        this.generator = data.generator;
        this.object = data.object;
        this.object.x = 1960;
        this.object.y = data.y || (1000 - 150) * Math.random() + 40;
        this.object.zindex = 20;
    };

    return function (data) {
        return new Obstacle(data);
    };
});