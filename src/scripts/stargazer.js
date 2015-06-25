/*global define, require*/
define("stargazer", ['jquery', 'render_service', 'game_service'],
    function ($, RenderService, GameService) {

        function init(canvas) {
            var render = new RenderService(canvas);
            new GameService(render);

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

require(['jquery', 'stargazer'], function ($, App) {
    "use strict";

    $(function () {
        App.init('app');
    });
});