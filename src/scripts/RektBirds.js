/*global define, require*/
define("RektBirds", ['jquery', 'render_service', 'game_service'],
    function ($, RenderService, GameService) {

        function init(canvas) {
            new RenderService(canvas);
            new GameService();

            $(document).keydown(function (e) {
                if (e.keyCode === 32) {
                    return false;
                }
            });
        }

        return {
            init: function (canvas) {
                init(canvas);
            }
        };
    }
);

require(['jquery', 'RektBirds'], function ($, App) {
    "use strict";

    $(function () {
        App.init('app');
    });
});