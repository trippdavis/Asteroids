(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Util === "undefined") {
    window.Asteroids.Util = {};
  }

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (length) {
    var x = length * ((Math.random() - 0.5) * 2);
    var y = Math.sqrt(Math.pow(length, 2) + Math.pow(x, 2));
    if (Math.random() < 0.5) {
      y *= -1;
    }
    return [x, y];
  };



})();
