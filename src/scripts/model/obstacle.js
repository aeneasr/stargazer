/*global define, Modernizr*/
define(['jquery', 'underscore'], function ($, _) {
    'use strict';
    var Obstacle;

    Obstacle = function(data){
        this.data = _.extend({}, {
            sprite: '',
            chance: 0,
            x: 0,
            y: 0
        }, data);
    };
});