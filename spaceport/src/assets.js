define([ ], function () {
    var assets = {
        art: null,
        sound: null,
        load: load
    };

    var isLoading = false;
    function load(callback) {
        if (isLoading) {
            die("load already called");
        }

        isLoading = true;

        function callCallback(/* */) {
            if (callback) {
                var c = callback;
                callback = null;
                c.apply(this, arguments);
            }
        }

        function checkDone() {
            if (assets.sound && assets.art) {
                callCallback(null);
            }
        }

        // Load sound
        // TODO
        assets.sound = { };

        // Load art
        var loader = new sp.Loader();
        loader.contentLoaderInfo.addEventListener(sp.Event.COMPLETE, function (event) {
            var appDomain = event.target.applicationDomain;

            assets.art = appDomain.definitions;

            checkDone();

            rel(arguments);
        });
        loader.contentLoaderInfo.addEventListener(sp.Event.ERROR, function (event) {
            callCallback(new Error(event.text));

            rel(arguments);
        });
        loader.load(new sp.URLRequest('../common/assets/game.swf'));
    }

    return assets;
});
