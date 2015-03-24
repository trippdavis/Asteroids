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
    var img = new Image();
    img.src = "lib/myImage.jpg";
    img.onload = function () {
      this.ctx.drawImage(img, 0, 0);
    };


    window.setInterval((function () {
      this.ctx.drawImage(img, 0, 0)
      this.game.step();
      this.game.draw(this.ctx);
      this.bindKeyHandlers();
      key('a', function(){ alert('you pressed a!') });
    }).bind(this), 20);
  };

})();
