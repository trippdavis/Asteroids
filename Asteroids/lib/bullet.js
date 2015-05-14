(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (obj) {
    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: obj.vel,
      radius: 3,
      color: "#FFFFFF",
      game: obj.game
    });
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
})();
