# React底层原理

#### React Router 原理

**Hash**

hash的兼容性较好，因此在早期的前端路由中大量的采用，但是使用hash也有很多缺点。

- 搜索引擎对带有hash的页面不友好
- 带有hash的页面内难以追踪用户行为

**History**

History.pushState():pushState可以将给定的数据压入到浏览器会话历史栈中

pushState()设置新的URL可以是任意与当前URL同源的URL，而hash只能改变#后面的内容，因此只能设置与当前URL同文档的URL

hisory为依据来实现路由的优点：

- 对搜索引擎友好
- 方便统计用户行为

缺点：

- 兼容性不如hash
- 需要后端做相应的配置，否则直接访问子页面会出现404错误



#### Diff算法

比如有这样的dom

```
<div id="div" class="classVal">
    <span>child</span>
</div>
```

那么Vdom就是这样的

```
{
    tagName: 'div',
    attributes: {
        'id': 'div',
        'class': 'classVal'
    },
    children: [{
        tagName: 'span',
        attributes: null,
        children: ['child']
    }]
}
```

![image](https://user-gold-cdn.xitu.io/2019/1/17/16859f41c260b5f3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

传统的diff算法，是需要跨级对比两个树之间的不同， 使用传统的 Diff 算法通过循环递归遍历节点进行对比，时间复杂度为O(n^3)，这样的对比是无法接受的，所以react提出了一个简单粗暴的diff算法，只对比同级元素，这样算法复杂度就变成了O(n)了，虽然不能做到最优的更新，但是时间复杂度大大减少，是一种平衡的算法，下面会提到

基于diff算法的同级对比，我们先讲下对比的过程中，它主要分为四种类型的对比，分别为:
 1、新建create： 新的vd中有这个节点，旧的没有
 2、删除remove： 新的vd中没有这个节点，旧的有
 3、替换replace： 新的vd的tagName和旧的tagName不同
 4、更新update： 除了上面三点外的不同，具体是比较attributes先，然后再比较children

#### 没有 key 值的更新问题

如果在for循环里没有key的情况，每次更新VDom一旦顺序变化每个节点都需要重新渲染，

### 总结

尽量减少跨层级的组件改动. 所以有来react的改版的diff算法，只比较同一级的元素，这样可以做到快速的比对，为O(n)，即使这样，在对比两棵树的时候，我们还是需要遍历所有的节点，我们知道dom的操作是昂贵的，即使是查找，也是昂贵的一个过程，特别是在节点很多的donm树下，所以虚拟dom应运而生，虚拟dom避开了直接操作dom的缺点，而是直接对比内存中vd，使得对比速度进一步得到质地提升。

 