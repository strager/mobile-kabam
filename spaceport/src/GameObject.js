define([ 'assets' ], function (assets) {
    function GameObject(type) {
        this.mc = new assets.art[type]();

        this.x = 0;
        this.y = 0;

        this.isViewDirty = false;
    }

    GameObject.prototype.viewDirty = function viewDirty() {
        this.isViewDirty = true;
    };

    GameObject.prototype.moveTo = function moveTo(x, y) {
        this.x = x;
        this.y = y;
        this.viewDirty();
    };

    GameObject.prototype.moveBy = function moveBy(dx, dy) {
        this.x += dx;
        this.y += dy;
        this.viewDirty();
    };

    GameObject.prototype.render = function render() {
        if (this.isViewDirty) {
            this.mc.x = this.x;
            this.mc.y = this.y;

            this.isViewDirty = false;
        }
    };

    return GameObject;
});
