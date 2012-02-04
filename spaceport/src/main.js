define([ ], function () {
    function main(stage) {
        var loader = new sp.Loader();
        loader.contentLoaderInfo.addEventListener(function (event) {
            var appDomain = event.target.applicationDomain;

            // TODO Do something useful

            rel(arguments);
        });

        loader.load(new sp.URLRequest('../common/assets/game.swf'));
        stage.addChild(loader); // Temporary

        console.log("Hello, world!");
    }

    return main;
});
