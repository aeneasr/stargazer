/*global define */
define(['easel'], function (createjs) {
    'use strict';
    var BlinkText;

    BlinkText = function (render, text, color) {
        var up,
            t = new createjs.Text(text, '50px "Lucida Console", "Lucida Sans Typewriter", monaco, "Bitstream Vera Sans Mono", monospace', color || '#eeeeee'),
            bo = t.getBounds();
        t.textAlign = 'center';
        t.alpha = 0.2;
        t.lineHeight = 60;
        t.x = render.width / 2;
        t.y = render.height / 2 - bo.height / 2;

        this.object = t;

        createjs.Ticker.addEventListener('tick', function (e) {
            if (up) {
                t.alpha += e.delta / 700;
            } else {
                t.alpha -= e.delta / 700;
            }
            if (up && t.alpha > 0.8) {
                t.alpha = 0.8;
                up = false;
            }
            if (!up && t.alpha < 0.1) {
                t.alpha = 0.1;
                up = true;
            }
        });
    };

    BlinkText.prototype.getObject = function () {
        return this.object;
    };

    return BlinkText;
});