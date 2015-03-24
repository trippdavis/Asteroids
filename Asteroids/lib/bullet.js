(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var BULLET_MULT = 2;
  var BULLET_COLOR = "#000000";
  var BULLET_RADIUS = 1;

  var Bullet = Asteroids.Bullet = function (obj) {
    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: [obj.vel[0] * BULLET_MULT, obj.vel[1] * BULLET_MULT],
      radius: BULLET_RADIUS,
      color: BULLET_COLOR,
      game: obj.game
    });
  };
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;
})();
