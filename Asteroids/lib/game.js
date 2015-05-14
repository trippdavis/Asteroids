(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.score = 0;
    this.over = false;
    this.lives = 3;
    this.dimX = 800;
    this.dimY = 600;
    this.newAsteroidNum = 0; // 0.02;
    this.refillNum = 0.005;
    obj = {
      pos: this.randomPosition(),
      game: this
    };
    this.ship = new Asteroids.Ship(obj);
    this.asteroids = [];
    this.bullets = [];
    this.lasers = [];
    this.refills = [];
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0 || pos[0] > this.dimX || pos[1] < 0 || pos[1] > this.dimY);
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets).concat(this.refills).concat(this.lasers);
  };

  Game.prototype.addAsteroid = function () {
    obj = {
      pos: this.randomEdgePosition(),
      game: this
    };
    var asteroid = new Asteroids.Asteroid(obj);
    this.asteroids.push(asteroid);
  };

  Game.prototype.addRefill = function () {
    obj = {
      pos: this.randomPosition(),
      game: this
    };
    var refill = new Asteroids.AmmoRefill(obj);
    this.refills.push(refill);
  };

  Game.prototype.randomPosition = function () {
    var posX = Math.floor(Math.random() * this.dimX);
    var posY = Math.floor(Math.random() * this.dimY);
    return [posX, posY];
  };

  Game.prototype.randomEdgePosition = function () {
    var borderPos = Math.floor(Math.random() * 2 * (this.dimX + this.dimY));
    var pos;
    if (borderPos < this.dimX) {
      pos = [borderPos, 0];
    } else if (borderPos < (this.dimX + this.dimY)) {
      pos = [this.dimX, borderPos - this.dimX];
    } else if (borderPos < ((2 * this.dimX) + this.dimY)) {
      pos = [borderPos - this.dimX - this.dimY, this.dimY];
    } else {
      pos = [0, borderPos - (2 * this.dimX) - this.dimY];
    }

    return pos;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.drawImage(img, 0, 0);
    var i;
    for (i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].draw(ctx);
    }

    this.showStats();
  };

  Game.prototype.showStats = function () {
    ctx.fillStyle = "white";
    ctx.font = "20pt Arial";
    ctx.fillText("Score: " + this.score, 10, 30);
    ctx.fillText("Lives: " + this.lives, 10, 60);
    ctx.fillText("Gun: " + this.ship.currentGun().name, 10, 90);
    ctx.fillText("Ammo: " + this.ship.currentGun().ammo, 10, 120);
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].move();
    }
  };

  Game.prototype.wrap = function (pos) {
    var posX, posY;
    if (pos[0] >= 0) {
      posX = pos[0] % this.dimX;
    }
    else if (pos[0] < 0) {
      posX = this.dimX + pos[0];
    }
    if (pos[1] >= 0) {
      posY = pos[1] % this.dimY;
    }
    else if (pos[1] < 0) {
      posY = this.dimY + pos[1];
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

  Game.prototype.removeObject = function (obj) {
    if (obj instanceof Asteroids.Bullet) {
      this.removeBullet(obj);
    } else if (obj instanceof Asteroids.Asteroid) {
      this.removeAsteroid(obj);
    } else if (obj instanceof Asteroids.AmmoRefill) {
      this.removeRefill(obj);
    }
  };

  Game.prototype.shootAsteroid = function (bullet, asteroid) {
    this.score = this.score + asteroid.score;
    this.removeAsteroid(asteroid);
    this.removeBullet(bullet);
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

  Game.prototype.removeRefill = function (refill) {
    for (var i = 0; i< this.refills.length; i++) {
      if (refill === this.refills[i]) {
        this.refills.splice(i, 1);
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    if (Math.random() < this.newAsteroidNum) {
      this.addAsteroid();
    }
    if (Math.random() < this.refillNum) {
      this.addRefill();
    }
    this.decreaseRefillTime();
    this.ship.decreaseRecoil();
  };

  Game.prototype.decreaseRefillTime = function () {
    for (var i = 0; i < this.refills.length; i++) {
      this.refills[i].timeLeft--;
      if (this.refills[i].timeLeft === 0) {
        this.removeRefill(this.refills[i]);
      }
    }
  };

  Game.prototype.over = function () {
    window.clearInterval(this.gameView.interval);
  };

})();
