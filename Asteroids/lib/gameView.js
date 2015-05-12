(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.ctx = ctx;
    this.game = new Asteroids.Game();
  };

  GameView.prototype.bindKeyHandlers = function () {
    if(key.isPressed("up")) {
      this.game.ship.power([0, -0.5]);
    }
    if(key.isPressed("down")) {
      this.game.ship.power([0, 0.5]);
    }
    if(key.isPressed("right")) {
      this.game.ship.power([0.5, 0]);
    }
    if(key.isPressed("left")) {
      this.game.ship.power([-0.5, 0]);
    }
    if(key.isPressed("space")) {
      this.game.ship.fireBullet();
    }
  };


  GameView.prototype.start = function () {
    window.interval = window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
      this.bindKeyHandlers();
    }).bind(this), 20);
  };

})();
