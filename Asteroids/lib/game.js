(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIM_X = 800;
  var DIM_Y = 600;
  var NUM_ASTEROIDS = 2;

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
    var obj = this.randomPosition();
    obj.game = this;
    this.ship = new Asteroids.Ship(obj);
    this.bullets = [];
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0 || pos[0] > DIM_X || pos[1] < 0 || pos[1] > DIM_Y);
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      var obj = this.randomPosition();
      obj.game = this;
      var asteroid = new Asteroids.Asteroid(obj);
      this.asteroids.push(asteroid);
    }
  };

  Game.prototype.randomPosition = function () {
    var posX = Math.floor((Math.random() * DIM_X));
    var posY = Math.floor((Math.random() * DIM_Y));
    return { pos: [posX, posY] };
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.drawImage(img, 0, 0);
    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].move();
    }
  };

  Game.prototype.wrap = function (pos) {
    var posX, posY;
    if (pos[0] >= 0) {
      posX = pos[0] % DIM_X;
    }
    else if (pos[0] < 0) {
      posX = DIM_X + pos[0];
    }
    if (pos[1] >= 0) {
      posY = pos[1] % DIM_Y;
    }
    else if (pos[1] < 0) {
      posY = DIM_Y + pos[1];
    }

    return [posX, posY];
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.allObjects().length; i++) {
      for (var j = (i + 1); j < this.allObjects().length; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
         this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.removeAsteroid = function (asteroid) {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (asteroid === this.asteroids[i]) {
        this.asteroids.splice(i, 1);
      }
    }
  };

  Game.prototype.removeBullet = function (bullet) {
    for (var i = 0; i < this.bullets.length; i++) {
      if (bullet === this.bullets[i]) {
        this.bullets.splice(i, 1);
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

})();
