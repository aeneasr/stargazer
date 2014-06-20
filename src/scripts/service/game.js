/*global define */
define(['jquery', 'underscore', 'easel', 'render_service', 'game_states'], function ($, _, createjs, RenderService, GameStates) {
    'use strict';
    var GameService,
        instance;

    GameService = function (options) {
        var that = this;

        that.data = _.extend({}, {
            state: GameStates.pausing
        }, options);

        that.render = new RenderService();

        $('body').keyup(function (e) {
            that.keyUp(e);
        });
    };

    GameService.prototype.load = function () {
        var self = this;
        self.data.state.init(self.render);
    };

    GameService.prototype.keyUp = function (e) {
        instance.data.state.keyUp(e, instance);
    };

    GameService.prototype.switchState = function (state) {
        var self = this;
        self.data.state = state;
        self.load();
    };

    return function (options) {
        // singleton
        return instance || (function () {
            instance = new GameService(options);
            instance.load();
            return instance;
        }());
    };
});