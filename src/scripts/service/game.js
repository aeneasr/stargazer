/*global define */
define(['jquery', 'underscore', 'easel', 'game_states'], function ($, _, createjs, GameStates) {
    'use strict';
    var GameService,
        instance,
        keyWasDown = false;

    GameService = function (render) {
        var that = this,
            $body = $('body');

        this.render = render;
        this.state = new GameStates(this, this.render);
        this.state.init(this.render);

        $body.keydown(function (e) {
            if (!keyWasDown) {
                that.keyDown(e);
                keyWasDown = true;
            }
        });
        $body.keyup(function () {
            keyWasDown = false;
        });
        $body.mousedown(function (e) {
            that.mouseDown(e);
        });
    };

    GameService.prototype.keyDown = function (e) {
        instance.state.keyDown(e, instance);
    };

    GameService.prototype.mouseDown = function (e) {
        instance.state.mouseDown(e, instance);
    };

    return function (render) {
        // singleton
        return instance || (function (render) {
                instance = new GameService(render);
                return instance;
            }(render));
    };
});
