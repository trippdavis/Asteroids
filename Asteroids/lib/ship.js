(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (obj) {
    this.recoil = 0;
    this.guns = [
      {name: "Pistol", ammo: 100},
      {name: "Shotgun", ammo: 20},
      {name: "Gun 3", ammo: 100},
      {name: "Gun 4", ammo: 100},
      {name: "Gun 5", ammo: 100}
    ];
    this.gunIndex = 0;

    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: [0, 0],
      radius: 10,
      color: "#FFFFFF",
      game: obj.game
    });
  };
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.vel = [0,0];
    this.pos = this.game.randomPosition();
  };

  Ship.prototype.power = function (impulse) {
    var velX = this.vel[0] + impulse[0];
    var velY = this.vel[1] + impulse[1];
    this.vel = [velX, velY];
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
      }
      this.color = "#f4e446";
    }
  };

  Ship.prototype.shootPistol = function () {
    var bullet = new Asteroids.Bullet({ pos: this.pos, vel: [this.vel[0] * 2, this.vel[1] * 2], game: this.game});
    this.game.bullets.push(bullet);
    this.currentGun().ammo--;
    this.recoil = 10;
  };

  Ship.prototype.shootShotgun = function () {
    var theta = Math.atan((this.vel[1])/(this.vel[0]));
    var vel = Math.pow((Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2)), 0.5);
    var delThetas = [-0.174533, -0.087266, 0, 0.087266, 0.174533];
    var i, vx, vy, newTheta, bullet;
    for (i = 0; i < delThetas.length; i++) {
      newTheta = theta + delThetas[i];
      vx = vel * Math.cos(newTheta);
      vy = vel * Math.sin(newTheta);
      if (this.vel[0] < 0) {
        vx *= -1;
        vy *= -1;
      }
      bullet = new Asteroids.Bullet({ pos: this.pos, vel: [vx, vy], game: this.game });
      this.game.bullets.push(bullet);
    }

    this.currentGun().ammo--;
    this.recoil = 20;
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
})();
