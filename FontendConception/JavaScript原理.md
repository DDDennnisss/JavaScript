# JavaScript原理

### 1. JS基本数据类型 和 引用数据类型

**基本数据类型**

1. String 字符串
2. Number 数值
3. Boolean 布尔值
4. Null 空值： 使用type of 返回对象
5. Undefined 未定义
6. Symbol ES6



**引用数据类型**

1. Array 数组
2. Object 对象
3. Function 函数
4. Date 类型



### 2. 函数提升与变量提升

**变量提升**

只有声明被提升，初始化不会被提升

声明会被提升到当前作用域的顶端

**函数提升**

函数声明和初始化都会被提升

函数表达式不会被提升



**函数提升在变量提升之前**

1. 变量的问题，莫过于声明和赋值两个步骤，而这两个步骤是分开的。
2. 函数声明被提升时，声明和赋值两个步骤都会被提升，而普通变量却只能提升声明步骤，而不能提升赋值步骤。
3. 变量被提升过后，先对提升上来的所有对象统一执行一遍声明步骤，然后再对变量执行一次赋值步骤。而执行赋值步骤时，会**优先执行函数变量的赋值步骤，再执行普通变量的赋值步骤**。



### 3. JavaScript This指向

1. 作为普通函数直接调用，this指向window

```javascript
function fun(){
  var age = 1;
}
fun();
console.log(age);//报错，age is not defined，这里的age是fun()中的局部变量
```

### 4. 闭包

闭包：有权访问另一个函数作用域中的变量的函数；一般情况就是在一个函数中包含另一个函数。

1. 闭包是一个函数，而且存在于另一个函数当中
2. 闭包可以访问到父级函数的变量，且该变量不会销毁

```js
var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name; // this指向window
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()()); // The Window

var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　var that = this; // this指向绑定object
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()()); // My Object
```

闭包的实现原理，其实是利用了作用域链的特性，我们都知道作用域链就是在当前执行环境下访问某个变量时，如果不存在就一直向外层寻找，最终寻找到最外层也就是全局作用域，这样就形成了一个链条。

**作用1：隐藏变量，避免全局污染**
**作用2：可以读取函数内部的变量。**
**作用3：另一个就是让这些变量的值始终保持在内存中。**

缺点1：导致变量不会被垃圾回收机制回收，造成内存消耗
缺点2：不恰当的使用闭包可能会造成内存泄漏的问题

通过闭包，可以是函数内部局部变量递增，不会影响全部变量，完美！！

```js
var a  = 10;
function Add3(){
    var a = 10;
    return function(){
        a++;
        return a;
    };
};
var cc =  Add3();
console.log(cc());
console.log(cc());
console.log(cc());
console.log(a);

cc = null // 让内部函数成为垃圾对象 ==》 回收闭包
```



### 5. 继承

**方法一： 原型链继承**

套路：1. 定义父类型构造函数

   2. 给父类型的原型添加方法

   3. 定义子类型的构造函数

   4. 创建父类型的对象赋值给子类型原型

   5. 将子类型原型的构造函数属性设置为子类型

   6. 给子类型原型添加方法

   7. 创建子类型对象：可以调用父类型的方法

      关键：

      **子类型的原型为父类型的一个实例**

```js
//父类型
function Super(){
	this.supProps = 'Super property'
}
Super.prototype.showSuperProps = function(){
    console.log(this.supProps)
}

//子类型
function Sub(){
 	this.subProps = 'Sub property'	   
}
// 子类型的原型为父类型的一个实例
Sub.prototype = new Super()
Sub.prototype.showSubProps = function(){
    console.log(this.subProps)
}

var sub = new Sub()
sub.showSuperProps()
```



**方法二： 借用构造函数继承**

套路：1. 定义父类型的构造函数

2. 定义子类型构造函数

3. 在子类型构造函数中调用父类型构造

   关键： 在子类型构造函数中通用call()调用父类型构造函数

```js
function Person(name,age){
    this.name = name
    this.age = age
}
function Student(name,age,price){
    Person.call(this,name,age)
    /* 相当于 this.name = name
    this.age = age */
    this.price = price;
}
```



**方法三： 组合继承**

原型链+借用构造函数的组合继承

1. 利用原型链实现对父类对象方法的继承
2. 利用call()借用对父类构建函数的初始化相同的属性

```js
function Person(name,age){
    this.name = name
    this.age = age
}
Person.prototype.setName = function(name){
        this.name = name;
}

function Student(name,age,price){
    Person.call(this,name,age)
    this.price = price;
    
}
Student.prototype = new Person() // 为了能看到父类型的方法
Student.prototype.constructor = Student
Student.prototype.setName = function(price){
        this.price = price;
}
```



**方法四： ES6类继承** 类似Java继承

```js
class Phone{
	constructor(brand, price){
        this.brand = brand
        this.price = price
    }
    call(){
        console.log('我可以打电话！')
    }
}
class SmartPhone extends Phone{
    constructor(brand, price, color, size){
        super(brand,price)
        this.color = color;
        this.size = size;
    }
}
//Super.call()可以调用重写的父类的方法
```



**方法五： 寄生继承**

```js

```

### 6. apply和call和bind的效果和异同

**相同点**

1.将第一个传入对象变为函数this的指向，并执行函数 

```js
let s = function(){console.log(this)}
let k = {a:123,b:312}
 
s() //Window 对象
s.apply(k)  // {a:123,b:312} 
s.call(k)   // {a:123,b:312}
```

2.将传入的第二个参数，传给函数

```js
let c = [1]
let func = function(a){console.log(a)}
func.apply(null,c) //1
func.call(null,c)  //[1]
```



**不同点**

1.apply的第二个参数只接受\**数组\**,传入对象不显示，传入其他报错(call不受限制)

```js
let c = {a:1}
let b = [1,2,3]
let k = '123'
let func = function(a){console.log(a)}
func.apply(null,c) //undefined
func.apply(null,b) // 1
func.apply(null,k) // error
```

2.apply会对传入的第二个参数进行分解，call整个传入

```js
let c = [1,2,3,4]
let func = function(){console.log(arguments)}
func.apply(null,c) //[1,2,3,4]
func.call(null,c)  //[[1,2,3,4]]
 
//更直观一点
let func = function(){console.log(arguments[0])}
func.apply(null,c) //1
func.call(null,c)  //[1,2,3,4]

//no arguement
let c = [1,2,3,4]
let func = function(a,b,c,d){console.log(a,b,c,d)}
func.apply(null,c) //1,2,3,4
func.call(null,c)  //[1,2,3,4] undefined undefined undefined
```



**bind**

```js
function getThis() {
      console.log(this)
    }
    var c = {
      name: 'xx'
    }
    getThis(); // window
    getThis.bind(c)
    getThis(); // window
    var newFunction = getThis.bind(c);
    newFunction(); // {name: "xx"}
```

其实bind和call、apply的区别就在于后两者是会让当前函数**立即执行**，而bind()方法并不会去立即执行当前函数，而是会创建一个**新的函数**，当调用这个**新的函数**时，会以创建这个**新函数**时传入bind()方法的第一个参数作为this。



### 7. Set 作用

集合是**无序且唯一**

集合的常用操作：去重，判断某元素是否在集合中，求交集

集合使用add方法如果加内容相同的object会是唯一的，因为内存地址不一样

```js
// Set key value是一样的
for(let [key, value] of mySet.entries()) console.log(key,value) 
// Set to array
const arr = [...mySet]
const arr = Array.from(mySet)
const intersection = new Set([...])
```



### 8. 箭头函数和普通函数区别

1.箭头函数不能用new来创建构造函数的实例，普通函数可以（因为箭头函数创建的时候程序不会为它创建construct方法，也就是没有构造能力，用完就丢掉了，不像普通函数重复利用，因此也不需要构造函数原型，也就是不会自动生成prototype属性）
2.程序不会给箭头函数创建arguments对象
3.普通函数中的this是动态的，而箭头函数中的this指向的是紧紧包裹箭头函数的那个对象（定义时决定的）
4.箭头函数不能通过bind、call、apply来改变this的值，但依然可以调用这几个方法（只是this的值不受这几个方法控制）

```js
//实现箭头函数有argument
function normal(){
	reuturn () => arguments.length;
}

let arrow = normal(1,2,3)
console.log("今天吃了" + arrow() + "碗饭")
```



### 9. event.currentTarget( ) 和 event.target( ) 的区别

这两个方法都是监听事件触发的目标。区别是，event.currentTarget( ) **会返回当前触发事件的元素**；而event.target( ) **会返回触发事件触发的源头元素**。

#### 9.1 event.currentTarget()

返回其监听器触发事件的节点，即当前处理该事件的元素、文档或窗口。包括冒泡和捕获事件

<img src="https://img-blog.csdnimg.cn/20190413173103126.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==,size_16,color_FFFFFF,t_70" alt="img" style="zoom: 80%;" />

#### 9.2 event.target( )

target 事件属性可返回事件的目标节点（触发该事件的节点，也就是事件发生的源头，事件发生所绑定的那个节点），如生成事件的元素、文档或窗口。也就是说，监听冒泡或者捕获事件的 target，会返回事件发生的那个元素，而不是冒泡或者捕获事件触发的元素。

<img src="https://img-blog.csdnimg.cn/20190413172821379.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==,size_16,color_FFFFFF,t_70" alt="img" style="zoom:80%;" />



### 10. 柯里化(Currying)

柯里化（Currying）是一种关于函数的高阶技术。

柯里化是一种函数的转换，它是指将一个函数从可调用的 `f(a, b, c)` 转换为可调用的 `f(a)(b)(c)`。

柯里化不会调用函数。它只是对函数进行转换。

```js
function curry(f) { // curry(f) 执行柯里化转换
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
```



### 11. Map 和 Object有什么区别

1. **Object **本质上是哈希结构的键值对的集合，它只能用字符串、数字或者Symbol等简单数据类型当作键，这就带来了很大的限制。

2. 填入Map的元素，会保持原有的顺序，而Object无法做到。

3. Map可以直接拿到长度，而Object不行。

4. 我们知道，对象其实就是在堆开辟了一块内存，其实Map的键存的就是这块内存的地址。只要地址不一样，就是两个不同的键，这就解决了同名属性的碰撞问题，而传统的Object显然做不到这一点。
5. Map类继承了Object，并对Object功能做了一些拓展，**Map的键可以是任意的数据类型。**



### 12. 判断数据类型

1. typeof 直接返回数据类型字段，但是无法判断数组、null、对象
2. instanceof 判断某个实例是不是属于原型
3. 使用 Object.prototype.toString.call()判断



### 13. new关键字 Js实现

```js
// 基础版
function _new(target) {
  if (typeof target !== "function")
    throw new TypeError("target must be a function");

  // 1. 创建一个全新的对象
  var obj = {};
  // 2. __proto__ 指向对象原型
  obj.__proto__ = target.prototype;
  // 3. 绑定上下文到 obj
  var result = target.apply(obj, Array.prototype.slice.call(arguments, 1));

  // 4.如果该函数没有返回对象，则返回新创建的对象
  var isObject = typeof result === "object" && result !== null;
  var isFunction = typeof result === "function";

  return isObject || isFunction ? result : obj;
}

// 完整版
function newOperator(ctor){
    if(typeof ctor !== 'function'){
      throw 'newOperator function the first param must be a function';
    }
    // ES6 new.target 是指向构造函数
    newOperator.target = ctor;
    // 1.创建一个全新的对象，
    // 2.并且执行[[Prototype]]链接
    // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
    var newObj = Object.create(ctor.prototype);
    // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
    // 除去ctor构造函数的其余参数
    var argsArr = [].slice.call(arguments, 1);
    // 3.生成的新对象会绑定到函数调用的`this`。
    // 获取到ctor函数返回结果
    var ctorReturnResult = ctor.apply(newObj, argsArr);
    // 小结4 中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
    var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
    var isFunction = typeof ctorReturnResult === 'function';
    if(isObject || isFunction){
        return ctorReturnResult;
    }
    // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
    return newObj;
}
```

