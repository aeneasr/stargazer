/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var Obstacle;

    Obstacle = function (data) {
        var self = this;

        this.velocity = data.velocity;
        this.object = data.object;
        this.object.x = 1960;
        this.object.y = 1000 * Math.random() + 40;

        createjs.Ticker.addEventListener('tick', function (event) {
            var ticker = event.delta / 20;

            self.object.x -= self.velocity * ticker;

            if (self.object.x < - 50) {
                // to be done
            }
        });
    };

    return function (data) {
        return new Obstacle(data);
    };
});