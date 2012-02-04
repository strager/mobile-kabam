define([ 'GameObject', 'enemyAI' ], function (GameObject, enemyAI) {
    var LEFT = 0;
    var RIGHT = 1;
    var UP = 2;
    var DOWN = 3;
    var FIRE = 4;

    var PLAYER_SPEED = 1;
    var PLAYER_MISSILE_SPEED = 3;
    var PLAYER_FIRE_RATE = 20;

    function keyCodeToAction(keyCode) {
        switch (keyCode) {
        case sp.Keyboard.LEFT:  return LEFT;
        case sp.Keyboard.RIGHT: return RIGHT;
        case sp.Keyboard.UP:    return UP;
        case sp.Keyboard.DOWN:  return DOWN;

        case sp.Keyboard.SPACE:
        case sp.Keyboard.X:
        case sp.Keyboard.Z:
        case sp.Keyboard.SHIFT:
            return FIRE;

        default:
            // Unknown key
            return null;
        }
    }

    function Game(stage) {
        this.stage = stage;

        this.actions = { }; // Hash

        this.player = new GameObject('Player');
        this.stage.addChild(this.player.mc);

        this.playerMissiles = [ ];

        this.enemies = [ ];

        this.fireTimer = 0;

        this.stage.addEventListener(sp.KeyboardEvent.KEY_DOWN, this.keyDown.bind(this));
        this.stage.addEventListener(sp.KeyboardEvent.KEY_UP, this.keyUp.bind(this));

        this.loadLevel({
            player: { x: 200, y: 300 },
            enemies: [
                { type: 'Enemy1', x: 100, y: 80 }
            ]
        });
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

    Game.prototype.loadLevel = function loadLevel(level) {
        // TODO Reset current state of all objects
        this.player.moveTo(level.player.x, level.player.y);

        level.enemies.forEach(function (enemyDesc) {
            var enemy = this.enemy(enemyDesc.type);
            enemy.moveTo(enemyDesc.x, enemyDesc.y);
        }, this);
    };

    Game.prototype.playerMissile = function playerMissile(type) {
        var missile = new GameObject(type);
        this.stage.addChild(missile.mc);
        missile.moveTo(this.player.x, this.player.y);
        this.playerMissiles.push(missile);
        return missile;
    };

    Game.prototype.enemy = function enemy(type) {
        var enemy = new GameObject(type);
        enemyAI[type](enemy);
        this.stage.addChild(enemy.mc);
        this.enemies.push(enemy);
        return enemy;
    };

    Game.prototype.tick = function tick() {
        // true and false conveniently coerce into 0 and 1, respectively
        var playerVX = this.getAction(RIGHT) - this.getAction(LEFT);
        var playerVY = this.getAction(DOWN) - this.getAction(UP);
        var length = Math.sqrt(playerVX * playerVX + playerVY * playerVY);

        if (length !== 0) {
            var d = PLAYER_SPEED / length;
            this.player.moveBy(
                playerVX * d,
                playerVY * d
            );
        }

        if (this.getAction(FIRE) && this.fireTimer === 0) {
            this.playerMissile('Missile1');
            this.fireTimer = PLAYER_FIRE_RATE;
        } else {
            if (this.fireTimer > 0) {
                this.fireTimer -= 1;
            }
        }

        this.playerMissiles.forEach(function (missile) {
            missile.moveBy(0, -PLAYER_MISSILE_SPEED);
        });

        this.enemies.forEach(function (enemy) {
            enemy.tick();
        });
    };

    Game.prototype.render = function render() {
        this.player.render();

        this.playerMissiles.forEach(function (missile) {
            missile.render();
        });

        this.enemies.forEach(function (enemy) {
            enemy.render();
        });
    };

    return Game;
});
