function person(a, b, c, d) {
  return {
    name: this.name,
    a: a, b: b, c: c, d: d
  }
}

var _name = { name: "Dennis" };

Function.prototype.newApply = function (obj, ...arr) {
  obj.p = this || window;
  const result = obj.p(...arr)
  delete obj.p;
  return result;
}

var test = person.newApply(_name, '1', '2', '3', '4')
console.log(test);