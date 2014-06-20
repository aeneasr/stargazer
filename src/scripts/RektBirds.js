/*global define, require*/
define("RektBirds", ['jquery', 'render_service', 'game_service'],
    function ($, RenderService, GameService) {

        function init(canvas) {
            new RenderService(canvas);
            new GameService();
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