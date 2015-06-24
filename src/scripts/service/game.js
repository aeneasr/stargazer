/*global define */
define(['jquery', 'underscore', 'easel', 'game_states'], function ($, _, createjs, GameStates) {
    'use strict';
    var GameService,
        instance;

    GameService = function (render) {
        var that = this;

        this.render = render;
        this.state = new GameStates(this, this.render);
        this.state.init(this.render);

        $('body').keyup(function (e) {
            that.keyUp(e);
        });
    };

    GameService.prototype.keyUp = function (e) {
        instance.state.keyUp(e, instance);
    };

    return function (render) {
        // singleton
        return instance || (function (render) {
            instance = new GameService(render);
            return instance;
        }(render));
    };
});
