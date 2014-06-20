/*global define */
define(['jquery', 'underscore', 'easel', 'state/loader/pausing', 'state/loader/dying', 'state/loader/playing'], function ($, _, createjs, PausingLoader, DyingLoader, PlayingLoader) {
    'use strict';
    var GameStates,
        KEYCODE_SPACE = 32,
        KEYCODE_ESCAPE = 27,
        children = [];

    function addChildren(render) {
        _.each(children, function (v) {
            render.getStage().addChild(v);
        });
    }

    function clearChildren(render) {
        _.each(children, function (v) {
            render.getStage().removeChild(v);
        });
        children = [];
    }

    GameStates = {
        dying: {
            init: function (render) {
                var loader = new DyingLoader();
                clearChildren(render);
                loader.createObjects(children);
                addChildren(render);
            },
            keyUp: function (e, game) {
                if (e.keyCode === KEYCODE_SPACE) {
                    game.switchState(GameStates.pausing);
                }
            }
        },
        pausing: {
            init: function (render) {
                var loader = new PausingLoader();
                clearChildren(render);
                loader.createObjects(children);
                addChildren(render);
            },
            keyUp: function (e, game) {
                if (e.keyCode === KEYCODE_SPACE) {
                    game.switchState(GameStates.playing);
                }
            }
        },
        playing: {
            init: function (render) {
                var loader = new PlayingLoader();
                clearChildren(render);
                loader.createObjects(children);
                addChildren(render);
            },
            clear: function (render) {
                clearChildren(render);
            },
            keyUp: function (e, game) {
                if (e.keyCode === KEYCODE_ESCAPE) {
                    game.switchState(GameStates.pausing);
                }
            }
        }
    };

    return GameStates;
});