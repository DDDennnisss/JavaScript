# Js常用方法

### 1. Object.keys()

```js
var obj = {'a':'123','b':'345'};
console.log(Object.keys(obj));  //['a','b']
 
var obj1 = { 100: "a", 2: "b", 7: "c"};
console.log(Object.keys(obj1)); // console: ["2", "7", "100"]
 
var obj2 = Object.create({}, { getFoo : { value : function () { return this.foo } } });
obj2.foo = 1;
console.log(Object.keys(obj2)); // console: ["foo"]
```



### 2. 不同类型转化为数组

arguements

```js
const arr = Array.prototype.slice.call(arguements)
```

Object

````js
var obj = {
    0:'one',
    1:'two',
    length: 2
};
obj = Array.from(obj); //object to array
for(var k of obj){
    console.log(k)
}
````

