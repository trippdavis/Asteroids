(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var AmmoRefill = Asteroids.AmmoRefill = function (obj) {
    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: [0, 0],
      radius: 5,
      color: "0000ff",
      game: obj.game
    });
  };

  Asteroids.Util.inherits(AmmoRefill, Asteroids.MovingObject);
})();
