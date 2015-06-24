/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var FuelBar,
        width = 200;

    FuelBar = function (player) {
        var self = this;

        this.player = player;
        this.object = new createjs.Shape();
        this.object.graphics.beginStroke("white").beginFill("white").drawRect(20, 20, width, 20).endStroke().endFill();

        createjs.Ticker.addEventListener('tick', function () {
            var fuel = player.getFuel(),
                maxFuel = player.getMaxFuel(),
                r = width / maxFuel;
            if (fuel !== maxFuel) {
                self.object.graphics.beginStroke("white").beginFill("black").drawRect(20, 20, width, 20).endFill().endStroke();
                self.object.graphics.beginFill("white").drawRect(20, 20, width - ((maxFuel - fuel) * r), 20).endFill();
            }
        });
    };

    FuelBar.prototype.getObject = function () {
        return this.object;
    };

    return function (player) {
        return new FuelBar(player);
    };
});