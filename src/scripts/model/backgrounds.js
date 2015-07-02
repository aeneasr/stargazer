/*global define */
define(['easel', 'underscore'], function (createjs, _) {
    'use strict';
    var Backgrounds;

    Backgrounds = function (render) {
        var self = this;
        function onload(b, img, self, i) {
            return function () {
                var w = self.render.width * 2,
                    h = self.render.height;
                if (i === 6) {
                    w = 2159;
                    h = 100;
                }
                b.graphics.beginBitmapFill(img, 'repeat-x').drawRect(0, 0, w * 2, h).endFill();
            };
        }

        function tick(e) {
            _.each(self.objects, function (v, k) {
                if (k > 0) {
                    v.x -= e.delta / 20 * (k + 1);
                    if (v.x < - self.render.width) {
                        v.x = 0;
                    }
                }
            });
        }

        this.objects = [];
        this.render = render;
        for (var i = 5; i >= 0; i--) {
            var b = new createjs.Shape(),
                img = new Image();
            img.src = 'build/images/bg/' + i + '.png';
            img.onload = onload(b, img, self, i);
            b.zindex = i;
            b.x = i * 100;
            if (i === 6) {
                b.y = self.render.height - 100;
                b.x = 0;
            }
            this.objects.unshift(b);
            createjs.Ticker.addEventListener('tick', tick);
        }
    };

    return Backgrounds;
});
