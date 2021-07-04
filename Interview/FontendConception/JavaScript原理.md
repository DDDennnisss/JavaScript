# JavaScript原理

#### 闭包

闭包：有权访问另一个函数作用域中的变量的函数；一般情况就是在一个函数中包含另一个函数。

1. 闭包是一个函数，而且存在于另一个函数当中
2. 闭包可以访问到父级函数的变量，且该变量不会销毁

```js
function person(){
    var name = '有鱼';
    function cat(){
        console.log(name);
    }
    return cat;
}
var per = person();// per的值就是return后的结果，即cat函数
per();// 有鱼 per()就相当于cat()
per();// 有鱼 同上，而且变量name没有销毁，一直存在内存中，供函数cat调用
per();// 有鱼
```

闭包的实现原理，其实是利用了作用域链的特性，我们都知道作用域链就是在当前执行环境下访问某个变量时，如果不存在就一直向外层寻找，最终寻找到最外层也就是全局作用域，这样就形成了一个链条。

作用1：隐藏变量，避免全局污染
作用2：可以读取函数内部的变量

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
```



#### 继承

利用原型链的思想实现继承的简单代码如下：

```js
function Parent() {
    this.name = 'zhangsan';
    this.children = ['A', 'B'];
}

Parent.prototype.getChildren = function() {
    console.log(this.children);
}

function Child() {

}

Child.prototype = new Parent();

var child1 = new Child();
child1.children.push('child1')
console.log(child1.getChildren()); // Array ["A", "B", "child1"]

var child2 = new Child();
child2.children.push('child2')
console.log(child2.getChildren()); // Array ["A", "B", "child1", "child2"]

```