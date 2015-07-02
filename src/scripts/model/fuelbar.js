/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var FuelBar,
        width = 200;

    FuelBar = function (player) {
        var self = this,
            lastFuel = -10;

        this.player = player;
        this.object = new createjs.Shape();
        this.object.graphics.beginStroke("white").beginFill("white").drawRect(20, 20, width, 20).endStroke().endFill();
        this.object.zindex = 1000;

        createjs.Ticker.addEventListener('tick', function () {
            var fuel = player.getFuel(),
                maxFuel = player.getMaxFuel(),
                r = width / maxFuel;
            if (fuel !== lastFuel) {
                self.object.graphics.beginStroke("white").beginFill("black").drawRect(20, 20, width, 20).endFill().endStroke();
                self.object.graphics.beginFill("white").drawRect(20, 20, width - ((maxFuel - fuel) * r), 20).endFill();
                lastFuel = fuel;
            }
        });
    };

    FuelBar.prototype.getObject = function () {
        return this.object;
    };

    return FuelBar;
});