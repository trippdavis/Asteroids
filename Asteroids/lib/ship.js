(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var COLOR = "#FFFFFF";
  var RADIUS = 10;

  var Ship = Asteroids.Ship = function (obj) {
    this.ammo = 100;

    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: [0, 0],
      radius: RADIUS,
      color: COLOR,
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

  Ship.prototype.fireBullet = function () {
    if (this.ammo > 0) {
      var bullet = new Asteroids.Bullet({ pos: this.pos, vel: this.vel, game: this.game});
      this.game.bullets.push(bullet);
      this.ammo = this.ammo - 1;
    }
  };
})();
