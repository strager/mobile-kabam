define([ 'Game', 'assets' ], function (Game, assets) {
    var TICK_DURATION = 10; // ms

    function main(stage) {
        assets.load(function (err) {
            if (err) die(err);

            var game = new Game(stage);

            var timeAccumulator = 0;
            var lastTime = NaN;
            stage.addEventListener(sp.Event.ENTER_FRAME, function (event) {
                var curTime = Date.now();
                if (isNaN(lastTime)) {
                    lastTime = curTime;
                    return;
                }

                timeAccumulator += curTime - lastTime;
                lastTime = curTime;

                while (timeAccumulator >= TICK_DURATION) {
                    timeAccumulator -= TICK_DURATION;
                    game.tick();
                }

                game.render();
            });
        });
    }

    return main;
});
