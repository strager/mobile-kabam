define([ ], function () {
    function tickEnemy1() {
        var dx = Math.sin(this.step / 30);
        this.moveBy(dx, 0);

        this.step += 1;
    };

    return {
        'Enemy1': function (enemy) {
            enemy.step = 0;
            enemy.tick = tickEnemy1;
        }
    };
});
