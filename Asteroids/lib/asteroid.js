(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (obj) {
    var vel = Asteroids.Util.randomVel(obj.pos, obj.game);

    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: vel,
      radius: (Math.random() * 30) + 20,
      color: "#ff0000",
      game: obj.game
    });
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
})();
