(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var COLOR = "#FFFFFF"; //add a color
  var RADIUS = 10;

  var Ship = Asteroids.Ship = function (obj) {
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
    this.pos = this.game.randomPosition().pos;
  };

  Ship.prototype.power = function (impulse) {
    var velX = this.vel[0] + impulse[0];
    var velY = this.vel[1] + impulse[1];
    this.vel = [velX, velY];
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({ pos: this.pos, vel: this.vel, game: this.game});
    this.game.bullets.push(bullet);
  };

})();
