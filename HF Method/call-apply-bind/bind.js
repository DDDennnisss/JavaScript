function person(a, b, c, d, e) {
  console.log(this.name);
  console.log(a, b, c, d, e);
}

var _name = { name: "Dennis" };

Function.prototype.newBind = function (obj, ...arr) {
  var that = this;
  console.log(arr);
  return function () {
    var arr2 = Array.prototype.slice.call(arguments)
    var arrSum = [...arr, ...arr2]
    that.apply(obj, arrSum)
  }
}

person.newBind(_name, '1', '2', '3', '4')('5')