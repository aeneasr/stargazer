/*global define */
define(['jquery', 'underscore', 'easel'], function ($, _, createjs) {
    'use strict';
    var Loader;

    Loader = function () {
    };

    Loader.prototype.createObjects = function (items) {
        items.push(new createjs.Text("You are a dead son of a bitch", "50px Arial"));
    };

    Loader.prototype.tick = function (items) {
    };

    return function () {
        return new Loader();
    };
});