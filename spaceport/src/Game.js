define([ 'GameObject' ], function (GameObject) {
    var LEFT = 0;
    var RIGHT = 1;
    var UP = 2;
    var DOWN = 3;
    var FIRE = 4;

    function keyCodeToAction(keyCode) {
        switch (keyCode) {
            case sp.Keyboard.LEFT:  return LEFT;
            case sp.Keyboard.RIGHT: return RIGHT;
            case sp.Keyboard.UP:    return UP;
            case sp.Keyboard.DOWN:  return DOWN;

            default:
                // Unknown key
                return null;
        }
    }

    function Game(stage) {
        this.actions = { }; // Hash

        this.player = new GameObject('Player');
        stage.addChild(this.player.mc);

        stage.addEventListener(sp.KeyboardEvent.KEY_DOWN, this.keyDown.bind(this));
        stage.addEventListener(sp.KeyboardEvent.KEY_UP, this.keyUp.bind(this));
    }

    Game.prototype.keyDown = function keyDown(event) {
        var action = keyCodeToAction(event.keyCode);
        if (action !== null) {
            this.actions[action] = true;
        }
    };

    Game.prototype.keyUp = function keyUp(event) {
        var action = keyCodeToAction(event.keyCode);
        if (action !== null) {
            this.actions[action] = false;
        }
    };

    Game.prototype.getAction = function getAction(name) {
        return this.actions[name] === true;
    };

    Game.prototype.tick = function tick() {
        // true and false conveniently coerce into 0 and 1, respectively
        var playerVX = this.getAction(RIGHT) - this.getAction(LEFT);
        var playerVY = this.getAction(DOWN) - this.getAction(UP);
        var length = Math.sqrt(playerVX * playerVX + playerVY * playerVY);

        if (length !== 0) {
            this.player.mc.x += playerVX / length;
            this.player.mc.y += playerVY / length;
        }
    };

    Game.prototype.render = function render() {
    };

    return Game;
});
