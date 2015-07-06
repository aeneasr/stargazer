/*global define */
define(['easel', 'underscore'], function (createjs, _) {
    'use strict';
    var Backgrounds,
        imageWidth = 3073;

    Backgrounds = function (render, ground, groundHeight) {
        var self = this,
            start = ground ? 4 : 3;
        function onload(b, img, self) {
            return function () {
                var h = self.render.height;
                b.graphics.beginBitmapFill(img, 'repeat-x').drawRect(0, 0, imageWidth * 2, h).endFill();
            };
        }

        function tick(e) {
            _.each(self.objects, function (v, k) {
                if (k === 0) {
                    return;
                }
                v.x -= e.delta / 15 * (k + 1);
                if (v.x < -imageWidth) {
                    v.x = 0;
                }
            });
        }

        this.objects = [];
        this.render = render;

        for (var i = start; i >= 0; i--) {
            var b = new createjs.Shape(),
                img = new Image();
            img.src = 'build/images/bg/' + i + '.png';
            img.onload = onload(b, img, self);
            b.zindex = i;
            b.x = i * 100;
            if (i === 4) {
                b.zindex = 99999;
                b.y = self.render.height - groundHeight;
                b.x = 0;
            }
            this.objects.unshift(b);
            createjs.Ticker.addEventListener('tick', tick);
        }
    };

    return Backgrounds;
});
