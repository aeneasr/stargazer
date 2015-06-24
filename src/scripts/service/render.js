/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var RenderService,
        instance;

    RenderService = function (canvas, width, height) {
        this.stage = new createjs.Stage(canvas);

        $(window).bind('resize', this.resize.bind(this));

        this.width = width || 1920;
        this.height = height || 1080;

        createjs.Ticker.addEventListener('tick', this.update.bind(this));
        createjs.Ticker.setFPS(60);
    };

    RenderService.prototype.resize = function () {
        var w = window.innerWidth,
            h = window.innerHeight,
            ow = this.width,
            oh = this.height,
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
        this.stage.update(event);
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