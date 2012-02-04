define([ 'assets' ], function (assets) {
    function main(stage) {
        assets.load(function (err) {
            if (err) die(err);

            var playerMC = new assets.art.Player();
            stage.addChild(playerMC);
        });
    }

    return main;
});
