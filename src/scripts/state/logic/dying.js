/*global define */
define(['jquery', 'underscore', 'easel', 'model/BlinkText', 'model/backgrounds'], function ($, _, createjs, BlinkText, Backgrounds) {
    'use strict';
    var Logic,
        instance,
        KEYCODE_SPACE = 32;

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function setCookie(cname, cvalue, exdays) {
        var expires = "expires=expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    Logic = function (options) {
        this.init(options);
    };

    Logic.prototype.init = function (options) {
        this.points = options.previous.points;
        this.highscore = parseInt(getCookie('highScore'));
        this.highscore = this.highscore || 0;
        if (this.points > this.highscore) {
            this.highscore = this.points;
            setCookie('highScore', this.points, 90);
        }

        this.game = options.game;
        this.render = options.render;
        this.state = options.state;
    };

    Logic.prototype.createObjects = function (items) {
        var t, messages, message;
        if (this.highscore > this.points) {
            messages = [
                'Dude...',
                'Ouch...',
                'Well...',
                'Oh boy...',
                'Jeez...',
                'Oh...'
            ];
            message = messages[randInt(0, messages.length - 1)];
            t = new BlinkText(this.render, message + '\n' + this.points + ' points.\nNot quite ' + this.highscore + '...\nPress space and try harder.');
        } else {
            messages = [
                'Wow!',
                'Awesome!',
                'Majestic!',
                'Glorious!',
                'Magnificent!',
                'Immortal!'
            ];
            message = messages[randInt(0, messages.length - 1)];
            t = new BlinkText(this.render, message + '\n You broke your high score with ' + this.points + ' points!\nPress space and get even better!');
        }

        this.background = new Backgrounds(this.render);
        _.each(this.background.objects, function (v) {
            items.push(v);
        });
        items.push(t.object);
    };

    Logic.prototype.keyUp = function (e) {
        if (e.keyCode === KEYCODE_SPACE) {
            instance.state.switchState('playing');
        }
    };

    Logic.prototype.clear = function () {
    };

    return function (game, render, state, previous) {
        var data = {game: game, render: render, state: state, previous: previous};
        if (instance) {
            instance.init(data);
            return instance;
        } else {
            instance = new Logic(data);
            return instance;
        }
    };
});
