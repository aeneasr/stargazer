/*global define */
define(['jquery', 'underscore'], function ($, _) {
    'use strict';
    var Player,
        States;

    States = {
        dead: 1,
        alive: 2
    };

    Player = function (data) {
        this.data = _.extend({}, {
            sprite: null,
            position: {
                x: 0,
                y: 0
            },
            state: States.alive
        }, data);
    };

    return {
        init: function (data) {
            return new Player(data);
        }
    };
});