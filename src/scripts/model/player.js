/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var Player,
        States;

    States = {
        dead: 1,
        alive: 2
    };

    Player = function () {
        var circle = new createjs.Shape(),
            self = this;

        circle.graphics.beginFill("red").drawCircle(0, 0, 20);
        circle.x = 50;
        circle.y = 500;

        this.state = States.alive;
        this.velocity = 0;
        this.gravity = 0.1;
        this.object = circle;

        createjs.Ticker.addEventListener('tick', function (event) {
            var ticker = event.delta / 10;
            self.object.y += ticker * self.velocity;
            self.velocity += self.gravity;
        });
    };

    Player.prototype.getObject = function () {
        return this.object;
    };

    Player.prototype.push = function () {
        this.velocity = -3;
    };

    return function () {
        return new Player();
    };
});