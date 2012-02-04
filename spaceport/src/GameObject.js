define([ 'assets' ], function (assets) {
    function GameObject() {
        // Public
        this.mc = null;

        this.isActive = true;
        this.isDestroyed = false;

        // Private
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

    GameObject.prototype.destroy = function destroy() {
        this.isActive = false;
        this.isDestroyed = true;
    };

    GameObject.prototype.getPhysics = function getPhysics() {
        return null;
    };

    GameObject.prototype.tick = function tick() {
        // Do nothing
    };

    GameObject.prototype.render = function render() {
        if (this.isViewDirty && this.mc) {
            this.mc.x = this.x;
            this.mc.y = this.y;

            this.isViewDirty = false;
        }
    };

    GameObject.create = function create(proto) {
        var ctor = proto.constructor || function () { };

        function Klass() {
            GameObject.call(this);
            ctor.apply(this, arguments);
        }

        function Dummy() { }
        Dummy.prototype = GameObject.prototype;

        Klass.prototype = new Dummy();
        Object.keys(proto).forEach(function (key) {
            Klass.prototype[key] = proto[key];
        });

        return Klass;
    };

    return GameObject;
});
