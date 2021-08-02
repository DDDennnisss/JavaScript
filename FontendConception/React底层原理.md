# React底层原理

### 1. React Router 原理

#### 1.1 `react-router-dom`和`react-router`和`history`库三者什么关系

`history` 可以理解为`react-router`的核心，也是整个路由原理的核心，里面集成了`popState,history.pushState`等底层路由实现的原理方法

`react-router`可以理解为是`react-router-dom`的核心，里面封装了`Router，Route，Switch`等核心组件,实现了从路由的改变到组件的更新的核心功能,在我们的项目中只要一次性引入`react-router-dom`就可以了。

`react-router-dom`,在`react-router`的核心基础上，添加了用于跳转的`Link`组件，和`histoy`模式下的`BrowserRouter`和`hash`模式下的`HashRouter`组件等。所谓

`BrowserRouter`和`HashRouter`，也只不过用了`history`库中`createBrowserHistory`和`createHashHistory`方法

#### 1.2 **Hash**

hash的兼容性较好，因此在早期的前端路由中大量的采用，但是使用hash也有很多缺点。

- 搜索引擎对带有hash的页面不友好
- 带有hash的页面内难以追踪用户行为

#### 1.3**History**

```history.pushState(state,title,path)```

pushState可以将给定的数据压入到浏览器会话历史栈中

pushState设置新的URL可以是任意与当前URL同源的URL，而hash只能改变#后面的内容，因此只能设置与当前URL同文档的URL

`state`：一个与指定网址相关的状态对象， popstate 事件触发时，该对象会传入回调函数。如果不需要可填 null。

`title`：新页面的标题，但是所有浏览器目前都忽略这个值，可填 null。

`path`：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个地址。



hisory为依据来实现路由的优点：

- 对搜索引擎友好
- 方便统计用户行为

缺点：

- 兼容性不如hash
- 需要后端做相应的配置，否则直接访问子页面会出现404错误



### 2. Diff 算法

#### 2.1 DOM树

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

#### 2.2 没有 key 值的更新问题

如果在for循环里没有key的情况，每次更新VDom一旦顺序变化每个节点都需要重新渲染，

#### 总结

尽量减少跨层级的组件改动. 所以有来react的改版的diff算法，只比较同一级的元素，这样可以做到快速的比对，为O(n)，即使这样，在对比两棵树的时候，我们还是需要遍历所有的节点，我们知道dom的操作是昂贵的，即使是查找，也是昂贵的一个过程，特别是在节点很多的donm树下，所以虚拟dom应运而生，虚拟dom避开了直接操作dom的缺点，而是直接对比内存中vd，使得对比速度进一步得到质地提升。

 

### 3. vue 和 react 的区别是什么？

https://zhuanlan.zhihu.com/p/100228073#:~:text=%E8%80%8CVue%E6%98%AF%E9%80%9A%E8%BF%87%E4%B8%80,%E7%9A%84%EF%BC%8C%E6%9B%B4%E5%8A%A0%E7%BA%AF%E7%B2%B9%E6%9B%B4%E5%8A%A0%E5%8E%9F%E7%94%9F%E3%80%82



### 4. React的事件和普通的HTML事件有什么不同？

React 事件不能采用 return false 的方式来阻止浏览器的默认行为，而必须要地明确地调用`preventDefault()`来阻止默认行为。

事件的执行顺序为原生事件先执行，合成事件后执行，合成事件会冒泡绑定到 document 上，所以尽量避免原生事件与合成事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到document 上合成事件才会执行。



### 5. useMemo, useCallback

**React.memo()**

在 class 组件时代，为了性能优化我们经常会选择使用 `PureComponent`,每次对 props 进行一次浅比较，除了 PureComponent 外，我们还可以在 `shouldComponentUpdate` 中进行更深层次的控制。

在 Function 组件中， React 提供了 `React.memo` 这个 HOC（高阶组件），与 PureComponent 很相似，但是是专门给 Function Component 提供的，对 Class Component 并不适用。

但是相比于 PureComponent ，`React.memo()` 可以支持指定一个`参数`，可以相当于 `shouldComponentUpdate` 的作用，因此 React.memo() 相对于 PureComponent 来说，用法更加方便。



1. 在子组件不需要父组件的值和函数的情况下，只需要使用 `memo` 函数包裹子组件即可。

2. 如果有函数传递给子组件，使用 `useCallback`

3. 如果有值传递给子组件，使用 `useMemo`

4. `useEffect`、`useMemo`、`useCallback` 都是**自带闭包**的。也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(`state`, `props`)，所以每一次这三种hooks的执行，反映的也都是**当前的状态**，你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用 `ref` 来访问。



### 6. 受控组件和非受控组件

#### 6.1 受控组件

<input>, <textarea>和<select> 通常自己维护state，并根据用户输入进行更新。而在React中，可变状态通常保存在state中只能用setState来改变state更新

```js
// 通过state来改变input value值
<input value = {this.state.value} onChange = {this.handleChange}
```



#### 6.2 非受控组件

不再是由react来托管，当不是为每一个状态更新都编写数据处理时，你可以用ref来重DOM节点中获取表单数据

通过`defaultValue`来定义初始值

```js
this.input = React.createRef()
// const input = useRef(null);

handleSubmit(event){
	alert('A name was submitted: ' + this.input.current.value) //如果用了createRef那么就可以在current上通过原生input的DOM来拿到value
}

<form onSubmit={this.handleSubmit}>
	<input type='text' ref={this.input} defaultValue="Bob"/>
</form> 
```



##### 6.2.1 文件输入

用户需要上传文件到服务器，或者通过`fileAPI` 所以它始终是一个非受控组件，因为他的值只能受用户控制

```js
<input type="file" /> //文件操作必须要用到非受控组件
    
const fileOnSelect = () => {
    setUploadMessage("Uploading ...");
    const selectedFile = inputFile.current.files[0];
  };
```

