/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var Player,
        States,
        maxFuel = 10,
        fuelCost = 2,
        rechargeDelay = 10,
        playerHeight = 200;

    States = {
        dead: 1,
        alive: 2
    };

    Player = function (render) {
        var circle = new createjs.Bitmap('build/images/rocket/1.png'),
            self = this;

        circle.rotation = 90;
        circle.x = 200;
        circle.y = 500;
        circle.scaleX = 0.3;
        circle.scaleY = 0.3;

        this.state = States.alive;
        this.velocity = 0;
        this.gravity = 0.1;
        this.rechargeDelay = 0;
        this.fuel = maxFuel;
        this.object = circle;

        createjs.Ticker.addEventListener('tick', function (event) {
            var ticker = event.delta / 6;
            self.object.y += ticker * self.velocity;
            self.velocity += self.gravity;

            if (self.object.y > render.height - 75 - playerHeight) {
                self.object.y = render.height - 75 - playerHeight;
                self.velocity = 0;
            }

            if (self.rechargeDelay > 0) {
                self.rechargeDelay -= ticker / 50;
            } else {
                self.fuel += ticker / 50;
            }

            if (self.fuel > maxFuel) {
                self.fuel = maxFuel;
            }
        });
    };

    Player.prototype.getFuel = function () {
        return this.fuel;
    };

    Player.prototype.getObject = function () {
        return this.object;
    };

    Player.prototype.getMaxFuel = function () {
        return maxFuel;
    };

    Player.prototype.push = function () {
        if (this.fuel >= fuelCost) {
            this.fuel -= fuelCost;
            this.rechargeDelay = rechargeDelay;
            this.velocity = -3.5 + (2 / (1 * (5 * this.fuel || 1)));
        }
    };

    return function (render) {
        return new Player(render);
    };
});