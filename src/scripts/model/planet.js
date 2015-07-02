/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    // TODO Pass states down from generator instead
    var Obstacle;

    Obstacle = function (data) {
        var self = this;

        this.states = data.states;
        this.velocity = data.velocity;
        this.object = data.object;
        this.object.x = 1960;
        this.object.y = 1000 * Math.random() + 40;
        this.object.zindex = 10;

        createjs.Ticker.addEventListener('tick', function (event) {
            var ticker = event.delta / 20;
            self.object.x -= self.velocity * ticker;
            if (self.object.x < 0 - self.object.image.width) {
                self.states.removeChild(self.object);
            }
        });
    };

    return function (data) {
        return new Obstacle(data);
    };
});