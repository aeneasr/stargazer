/*global define */
define(['jquery', 'underscore'], function ($, _) {
    'use strict';
    var Map;

    Map = function (data) {
        this.data = _.extend({}, {
            sprite: null
        }, data);
    };

    return {
        init: function (data) {
            return new Map(data);
        }
    };
});