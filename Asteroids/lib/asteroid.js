(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var COLOR = "#ff0000";
  var RADIUS = 20;

  var Asteroid = Asteroids.Asteroid = function (obj) {
    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: Asteroids.Util.randomVec(1),
      radius: RADIUS,
      color: COLOR,
      game: obj.game
    });
  };
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();
