var sum = function() {
  var accum = 0;
  for (var i = 0; i < arguments.length; i++) {
    accum += arguments[i];
  }
  return accum;
};

// console.log(sum(1, 2, 3, 4));

Function.prototype.myBind = function(obj) {
  var that = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    var args2 = Array.prototype.slice.call(arguments, 0);
    var allArgs = args.concat(args2);
    that.apply(obj, allArgs);
  };
};

var cat = {
  sum: 0,
  name: "markov",

  addNums: function () {
    var accum = 0;
    for (var i = 0; i < arguments.length; i++) {
      accum += arguments[i];
    }
    this.sum += accum;
  }
};


var myBoundFunction = cat.addNums.myBind(cat, 1, 2);
myBoundFunction(3);

// console.log(cat.sum);


var curriedSum = function (numArgs) {
  var numbers = [];
  var _curriedSum = function (num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      var sum = 0;
      for (var i = 0; i < numbers.length; i++) {
        sum += numbers[i];
      }
      return sum;
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;
};

// var sum = curriedSum(2);
// console.log(sum(5)(5));

Function.prototype.curry = function (numArgs) {
  var args = [];
  var that = this;
  var _curriedFunction = function (arg) {
    args.push(arg);
    if (args.length === numArgs) {
      var dummy = {};
      return that.apply(dummy, args);
    }
    else {
      return _curriedFunction;
    }
  };
  return _curriedFunction;
};

console.log(sum.curry(3)(5)(5)(5));
