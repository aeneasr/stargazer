/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var Item;

    Item = function (data) {
        var self = this;

        this.states = data.states;
        this.velocity = data.velocity;
        this.type = data.type;
        this.player = data.player;
        this.object = data.object;
        this.object.x = 1960;
        this.object.y = 1000 * Math.random() + 40;
        this.object.zindex = 30;

        createjs.Ticker.addEventListener('tick', function (event) {
            var ticker = event.delta / 20;
            self.object.x -= self.velocity * ticker;
            if (self.object.x < -40) {
                self.states.removeChild(self.object);
            }
        });
    };

    return Item;
});