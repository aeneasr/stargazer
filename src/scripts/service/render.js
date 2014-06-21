/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var RenderService,
        instance;

    RenderService = function (canvas) {
        this.stage = new createjs.Stage(canvas);

        $(window).bind('resize', this.resize);

        createjs.Ticker.addEventListener('tick', this.update);
        createjs.Ticker.setFPS(60);
    };

    RenderService.prototype.resize = function () {
        var w = window.innerWidth,
            h = window.innerHeight,
            ow = 1920,
            oh = 1080,
            stage = instance.stage,
            scale = Math.min(w / ow, h / oh);

        stage.scaleX = scale;
        stage.scaleY = scale;

        // adjust canvas size
        stage.canvas.width = ow * scale;
        stage.canvas.height = oh * scale;

        stage.update();
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
            instance.resize();
            return instance;
        }());
    };
});