Function.prototype.inherits = function (superclass) {
  var subclass = this;
  function Surrogate () {}
  Surrogate.prototype = superclass.prototype;
  subclass.prototype = new Surrogate();
};

function MovingObject () {};

MovingObject.prototype.move = function () {
  console.log("Moved");
};

function Ship (name) {
  this.name = name;
};
Ship.inherits(MovingObject);

Ship.prototype.shoot = function () {
  console.log("Bang");
};

function Asteroid () {};
Asteroid.inherits(MovingObject);

Asteroid.prototype.hit = function () {
  console.log("Crash");
};

var ship = new Ship("ship");
// console.log(typeof ship);
// ship.move();
// ship.shoot();
// ship.hit(); // error

var asteroid = new Asteroid();
// asteroid.move();
// asteroid.hit();
// asteroid.shoot(); // error

var obj = new MovingObject();
obj.move();
obj.hit(); // error
