(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var COLOR = "#ff0000"; //add a color
  var RADIUS = 20; // add a radius

  var Asteroid = Asteroids.Asteroid = function (obj) {
    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: Asteroids.Util.randomVec(1), //give correct length
      radius: RADIUS,
      color: COLOR,
      game: obj.game
    });
  };
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();

// this.pos = obj.pos,
// this.vel = obj.vel,
// this.radius = obj.radius,
// this.color = obj.color
