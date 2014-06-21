/*global define */
define(['jquery', 'underscore', 'easel', 'render_service', 'game_states'], function ($, _, createjs, RenderService, GameStates) {
    'use strict';
    var GameService,
        instance;

    GameService = function () {
        var that = this;

        this.render = new RenderService();
        this.state = new GameStates(this, this.render);

        $('body').keyup(function (e) {
            that.keyUp(e);
        });
    };

    GameService.prototype.load = function () {
        this.state.init(this.render);
    };

    GameService.prototype.keyUp = function (e) {
        instance.state.keyUp(e, instance);
    };

    return function () {
        // singleton
        return instance || (function () {
            instance = new GameService();
            instance.load();
            return instance;
        }());
    };
});