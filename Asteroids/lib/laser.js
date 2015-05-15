(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Laser = Asteroids.Laser = function (obj) {
    var mult = (20 / Math.pow(Math.pow(obj.dir[0], 2) + Math.pow(obj.dir[1], 2), 0.5));
    this.vel = [obj.dir[0] * mult, obj.dir[1] * mult];
    this.pos = obj.pos;
    this.theta = Math.atan(this.vel[1] / this.vel[0]);
    if (this.vel[0] < 0) {
      this.theta += (Math.PI);
    }
    this.endPos = this.firstEndPos();
    this.game = obj.game;
    this.radius = 2;
    this.color = "#33CCFF";
  };

  Laser.prototype.firstEndPos = function () {
    var x = this.pos[0] + 50 * Math.cos(this.theta);
    var y = this.pos[1] + 50 * Math.sin(this.theta);
    return [x, y];
  };

  Laser.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      (Math.PI / 2) + this.theta,
      (3 * Math.PI / 2) + this.theta
    );
    ctx.arc(
      this.endPos[0],
      this.endPos[1],
      this.radius,
      (3 * Math.PI / 2) + this.theta,
      (Math.PI / 2) + this.theta
    );

    ctx.closePath();
    ctx.fill();
  };

  Laser.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.endPos[0] += this.vel[0];
    this.endPos[1] += this.vel[1];
  };

  Laser.prototype.isCollidedWith = function (asteroid) {
    var dist1 = Math.sqrt(Math.pow((this.pos[0] - asteroid.pos[0]), 2) + Math.pow((this.pos[1] - asteroid.pos[1]), 2));
    var dist2 = Math.sqrt(Math.pow((this.endPos[0] - asteroid.pos[0]), 2) + Math.pow((this.endPos[1] - asteroid.pos[1]), 2));
    var dist = this.radius + asteroid.radius;
    return (dist1 <= dist || dist2 <= dist);
  };
})();
