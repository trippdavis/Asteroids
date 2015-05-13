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
      color: "#00b0e5",
      game: obj.game
    });

    this.timeLeft = 200;
  };

  Asteroids.Util.inherits(AmmoRefill, Asteroids.MovingObject);
})();
