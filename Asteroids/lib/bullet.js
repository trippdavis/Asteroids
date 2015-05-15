(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (obj) {
    var mult = (20 / Math.pow(Math.pow(obj.dir[0], 2) + Math.pow(obj.dir[1], 2), 0.5));
    var vel = [obj.dir[0] * mult, obj.dir[1] * mult];

    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: vel,
      radius: 3,
      color: "#FFFFFF",
      game: obj.game
    });
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
})();
