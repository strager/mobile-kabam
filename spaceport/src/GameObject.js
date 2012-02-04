define([ 'assets' ], function (assets) {
    function GameObject(type) {
        this.mc = new assets.art[type]();
    }

    return GameObject;
});
