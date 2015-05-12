(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var COLOR = "#ff0000";
  var RADIUS = 20;

  var Asteroid = Asteroids.Asteroid = function (obj) {
    debugger
    var vel = Asteroids.Util.randomVel(obj.pos, obj.game);

    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: vel,
      radius: RADIUS,
      color: COLOR,
      game: obj.game
    });
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
})();
