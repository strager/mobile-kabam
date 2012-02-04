define([ 'assets', 'GameObject' ], function (assets, GameObject) {
    function mcBoundsPhysics() {
        return this.mc.getBounds();
    }

    return {
        'Player': GameObject.create({
            constructor: function Missile1() {
                this.mc = new assets.art.Player();
            },

            getPhysics: mcBoundsPhysics
        }),

        'Missile1': GameObject.create({
            constructor: function Missile1() {
                this.mc = new assets.art.Missile1();
            },

            tick: function tick() {
                this.moveBy(0, -20);
            },

            getPhysics: mcBoundsPhysics
        }),

        'Enemy1': GameObject.create({
            constructor: function Enemy1() {
                this.mc = new assets.art.Enemy1();

                this.step = 0;
            },

            tick: function tick() {
                var dx = Math.sin(this.step / 30);
                this.moveBy(dx, 0);

                this.step += 1;
            },

            getPhysics: mcBoundsPhysics
        })
    };
});
