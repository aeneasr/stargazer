/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var RenderService,
        instance;

    RenderService = function (canvas) {
        this.stage = new createjs.Stage(canvas);

        // var circle = new createjs.Shape();
        // circle.graphics.beginFill("red").drawCircle(0, 0, 50);
        // circle.x = circle.y = 60;
        // stage.addChild(circle);

        createjs.Ticker.addEventListener('tick', this.update);
        createjs.Ticker.setFPS(60);
    };

    RenderService.prototype.update = function (event) {
        instance.stage.update(event);
    };

    RenderService.prototype.getStage = function () {
        return instance.stage;
    };

    return function (options) {
        // singleton
        return instance || (function () {
            instance = new RenderService(options);
            return instance;
        }());
    };
});