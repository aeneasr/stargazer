/*global define */
define(['jquery', 'underscore', 'easel', 'state/logic/pausing', 'state/logic/dying', 'state/logic/playing', 'state/logic/starting'], function ($, _, createjs, PausingLogic, DyingLogic, PlayingLogic, StartingLogic) {
    'use strict';
    var GameStates,
        instance;

    GameStates = function (game, render) {
        this.game = game;
        this.render = render;
        this.children = [];
        this.state = new StartingLogic(this.game, this.render, this);
    };

    GameStates.prototype.switchState = function (state) {
        var oldState = this.state;
        this.clear();
        if (state === 'pausing') {
            this.state = new PausingLogic(this.game, this.render, this, oldState);
        } else if (state === 'dying') {
            this.state = new DyingLogic(this.game, this.render, this, oldState);
        } else if (state === 'playing') {
            this.state = new PlayingLogic(this.game, this.render, this, oldState);
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
        var stage = this.render.getStage();
        this.children.push(child);
        stage.addChild(child);
        stage.sortChildren(function (a, b) {
            var az = a.zindex || 0,
                bz = b.zindex || 0;
            return az - bz;
        });
    };

    GameStates.prototype.removeChild = function (child) {
        var index = this.children.indexOf(this.children);
        if (index > -1) {
            this.children.splice(index, 1);
        }
        child.removeAllEventListeners();
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
        createjs.Ticker.removeAllEventListeners();
        this.render.attach();
    };

    return function (game, render) {
        // singleton
        return instance || (function () {
                instance = new GameStates(game, render);
                return instance;
            }());
    };
});