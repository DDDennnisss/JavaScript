## Javascript Learning

A repo to learn Javascript.

**学习视频：**

- [尚硅谷最新版 JavaScript 基础全套教程完整版)](https://www.bilibili.com/video/BV1YW411T7GX?p=138)
- [尚硅谷 JavaScript 高级教程(javascript 实战进阶)](https://www.bilibili.com/video/BV14s411E7qf?p=17&spm_id_from=pageDriver)
- [尚硅谷 Web 前端 ES6 教程，涵盖 ES6-ES11](https://www.bilibili.com/video/BV1uK411H7on?p=27)

| **学习内容**                                                                                        | **更新时间** | **备注**   |
| --------------------------------------------------------------------------------------------------- | ------------ | ---------- |
| [Javascript 中的 this 指向]                                                                         | 2021-06-01   |            |
| [Event Loop 解析](https://www.bilibili.com/video/BV1kf4y1U7Ln?from=search&seid=8220960353061504686) | 2021-06-02   |            |
| [原型与原型链](https://www.bilibili.com/video/BV14s411E7qf?p=17&spm_id_from=pageDriver)             | 2021-06-04   | P15 -- P21 |

###原型与原型链###

1.**proto**：不管是函数还是实例对象都有**proto**这个属性， 所有函数的**proto**都指向一个地方：Function 的原型 f()[native code]
2.constructor：
a. 除了 Function 的所有函数的 constructor 值和**proto 一样都指向：Function 的原型
b.Function 函数的 constructor 指向的是它自己本身，
c.Function 的原型对象的 constructor 指向 Function 函数
3.prototype：只有函数才有的属性，而实例对象没有（没有 function 的），原型对象都没有这个属性
4.Object 原型对象（Object）：既不是 Object 也不是 Function，负责存储特定的方法
5.Function 原型对象（ƒ () { 【native code】 }）：负责函数的创建，
所以所有的函数的**proto**r 都指向这里，
除了 Function 函数的所有函数的 constructo 都指向这里，
因为 Function 可以自己创建自己：new Function()
6.Function：最特殊的是，**proto\_\_和 prototype 相等，都指向 Function 原型对象
