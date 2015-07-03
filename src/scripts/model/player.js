/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var Player,
        States,
        maxFuel = 10,
        fuelCost = 2,
        rechargeDelay = 10,
        playerHeight = 185,
        lastVelocity = 0;

    States = {
        dead: 1,
        alive: 2
    };

    Player = function (state, render, groundHeight) {
        var spriteSheet = new createjs.SpriteSheet({
                images: [
                    'build/images/player/0-01.png',
                    'build/images/player/0-02.png',
                    'build/images/player/0-03.png',
                    'build/images/player/0-04.png',
                    'build/images/player/0-05.png',
                    'build/images/player/0-06.png'
                ],
                frames: {
                    width: 96,
                    height: 184
                },
                animations: {
                    walk: [0, 5, 'walk', 0.089],
                    jump: 1,
                    fall: 2
                }
            }),
            player = new createjs.Sprite(spriteSheet);

        player.x = 97;
        player.y = 185;
        player.zindex = 9999;

        this.state = States.alive;
        this.velocity = 0;
        this.gravity = 0.1;
        this.rechargeDelay = 0;
        this.fuel = maxFuel;
        this.object = player;
        this.render = render;
        this.groundHeight = groundHeight;
        this.state = state;

        createjs.Ticker.on('tick', this.tick, this);
    };

    Player.prototype.clear = function () {
        createjs.Ticker.removeEventListener('tick', this.tick);
    };

    Player.prototype.tick = function (event) {
        var ticker = event.delta / 6,
            self = this;
        self.object.y += ticker * self.velocity;
        self.velocity += self.gravity;

        if (self.object.y >= this.render.height - this.groundHeight - playerHeight) {
            self.object.y = this.render.height - this.groundHeight - playerHeight;
            self.velocity = 0;
        }

        if (self.velocity !== lastVelocity) {
            if (self.velocity < 0) {
                self.object.gotoAndStop('jump');
            } else if (self.velocity > 0) {
                self.object.gotoAndStop('fall');
            } else {
                self.object.gotoAndPlay('walk');
            }
            lastVelocity = self.velocity;
        }

        if (self.rechargeDelay > 0) {
            self.rechargeDelay -= ticker / 30;
        } else {
            self.fuel += ticker / 50;
        }

        if (self.fuel > maxFuel) {
            self.fuel = maxFuel;
        }
    };


    Player.prototype.refill = function () {
        this.fuel = maxFuel;
        this.rechargeDelay = 0;
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
            this.velocity = -3.5 + (2 / (5 * this.fuel || 1));
        }
    };

    return Player;
});
