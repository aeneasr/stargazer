/*global define */
define(['jquery', 'underscore', 'easel', 'state/logic/pausing', 'state/logic/dying', 'state/logic/playing'], function ($, _, createjs, PausingLogic, DyingLogic, PlayingLogic) {
    'use strict';
    var GameStates,
        instance;

    GameStates = function (game, render) {
        this.game = game;
        this.render = render;
        this.children = [];
        this.state = new PlayingLogic(this.game, this.render, this);
    };

    GameStates.prototype.switchState = function (state) {
        this.clear();
        if (state === 'pausing') {
            this.state = new PausingLogic(this.game, this.render, this);
        } else if (state === 'dying') {
            this.state = new DyingLogic(this.game, this.render, this);
        } else if (state === 'playing') {
            this.state = new PlayingLogic(this.game, this.render, this);
        }
        this.init();
    };

    GameStates.prototype.clearChildren = function () {
        var that = this;
        _.each(this.children, function (v) {
            that.render.getStage().removeChild(v);
        });
        this.children = [];
    };

    GameStates.prototype.addChild = function (child) {
        this.children.push(child);
        this.render.getStage().addChild(child);
    };

    GameStates.prototype.removeChild = function (child) {
        var index = this.children.indexOf(this.children);
        if (index > -1) {
            this.children.splice(index, 1);
        }
        this.render.getStage().removeChild(child);
    };

    GameStates.prototype.addChildren = function () {
        var that = this;
        _.each(this.children, function (v) {
            that.render.getStage().addChild(v);
        });
    };

    GameStates.prototype.init = function () {
        this.state.createObjects(this.children);
        this.addChildren();
    };

    GameStates.prototype.keyUp = function (e) {
        instance.state.keyUp(e);
    };

    GameStates.prototype.clear = function () {
        this.state.clear();
        this.clearChildren(this.render);
    };

    return function (game, render) {
        // singleton
        return instance || (function () {
            instance = new GameStates(game, render);
            return instance;
        }());
    };
});