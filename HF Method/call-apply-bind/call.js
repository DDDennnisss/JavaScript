function person(a, b, c, d) {
  console.log(this.name);
  console.log(a, b, c, d);
}

var _name = { name: "Dennis" };

Function.prototype.newCall = function (obj, ...arr) {
  obj.p = this || window;
  obj.p(...arr)
  delete obj.p;
}

person.newCall(_name, '1', '2', '3', '4')