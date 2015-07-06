/*global define */
define(['underscore', 'easel', 'sound'], function (_, createjs) {
    var Music,
        instance;

    Music = function () {
        this.channels = [];
    };

    Music.prototype.addChannel = function (ch) {
        this.channels.push(ch);
    };

    Music.prototype.pauseAll = function () {
        _.each(this.channels, function (ch) {
            ch.stop();
        });
    };

    Music.prototype.toggleAll = function () {
        _.each(this.channels, function (ch) {
            if (ch.playState === createjs.Sound.PLAY_SUCCEEDED) {
                ch.stop();
            } else {
                ch.play(ch.id, createjs.Sound.INTERRUPT_NONE);
            }
        });
    };

    Music.prototype.playAll = function () {
        _.each(this.channels, function (ch) {
            ch.play();
        });
    };

    return function (ch) {
        if (!instance) {
            instance = new Music(ch);
        }
        return instance;
    };
});
