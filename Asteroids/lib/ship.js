(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (obj) {
    this.recoil = 0;
    this.guns = [
      {name: "Pistol", ammo: 100},
      {name: "Shotgun", ammo: 20},
      {name: "Laser", ammo: 1000},
      {name: "Gun 4", ammo: 100},
      {name: "Gun 5", ammo: 100}
    ];
    this.gunIndex = 0;
    this.theta = 0;
    this.speed = 0;

    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      radius: 30,
      color: "#FFFFFF",
      game: obj.game
    });
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function () {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    var deltaTheta = (Math.PI / 2) + this.theta;
    ctx.rotate(deltaTheta);
    ctx.drawImage(spaceshipImg, -spaceshipImg.width / 2, -spaceshipImg.width / 2);
    ctx.restore();
  };

  Ship.prototype.move = function () {
    this.pos[0] += (this.speed) * Math.cos(this.theta);
    this.pos[1] += (this.speed) * Math.sin(this.theta);
    if (this.game.isOutOfBounds(this.pos)) {
      this.pos = this.game.wrap(this.pos);
    }
  };

  Ship.prototype.relocate = function () {
    this.vel = [0,0];
    this.pos = this.game.randomPosition();
  };

  Ship.prototype.changeSpeed = function (mult) {
    this.speed += (mult * 1);
  };

  Ship.prototype.changeDir = function (mult) {
    this.theta += (mult * 0.0349);
  };

  Ship.prototype.shootGun = function () {
    if (this.currentGun().ammo > 0 && this.recoil === 0) {
      switch (this.currentGun().name) {
        case "Pistol":
          this.shootPistol();
          break;
        case "Shotgun":
          this.shootShotgun();
          break;
        case "Laser":
          this.shootLaser();
          break;
      }
      this.color = "#f4e446";
    }
  };

  Ship.prototype.shootPistol = function () {
    var bullet = new Asteroids.Bullet({ pos: this.pos, dir: this.theta, game: this.game});
    this.game.bullets.push(bullet);
    this.currentGun().ammo--;
    this.recoil = 10;
  };

  Ship.prototype.shootShotgun = function () {
    var delThetas = [-0.174533, -0.087266, 0, 0.087266, 0.174533];
    var i, x, y, newTheta, bullet;
    for (i = 0; i < delThetas.length; i++) {
      newTheta = this.theta + delThetas[i];
      bullet = new Asteroids.Bullet({ pos: this.pos, dir: newTheta, game: this.game });
      this.game.bullets.push(bullet);
    }

    this.currentGun().ammo--;
    this.recoil = 30;
  };

  Ship.prototype.shootLaser = function () {
    var laser = new Asteroids.Laser({ pos: this.pos, dir: this.theta, game: this.game });
    this.game.lasers.push(laser);
    this.currentGun().ammo--;
    this.recoil = 50;
  };

  Ship.prototype.decreaseRecoil = function () {
    if (this.recoil > 0) {
      this.recoil--;
      if (this.recoil === 0) {
        this.color = "#FFFFFF";
      }
    }
  };

  Ship.prototype.currentGun = function () {
    return this.guns[this.gunIndex];
  };

  Ship.prototype.ammoRefill = function () {
    this.currentGun().ammo += 20;
  };
})();
