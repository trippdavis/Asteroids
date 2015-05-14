(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Laser = Asteroids.Laser = function (obj) {
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.game = obj.game;
    this.theta = Math.atan(this.vel[1] / this.vel[0]);
    if (this.vel[0] < 0) {
      this.theta += (Math.PI);
    }
    this.color = "#33CCFF";
  };

  Laser.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      2,
      (Math.PI / 2) + this.theta,
      (3 * Math.PI / 2) + this.theta
    );
    ctx.arc(
      this.pos[0] + 50 * Math.cos(this.theta),
      this.pos[1] + 50 * Math.sin(this.theta),
      2,
      (3 * Math.PI / 2) + this.theta,
      (Math.PI / 2) + this.theta
    );

    ctx.closePath();
    ctx.fill();
  };

  Laser.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };
})();
