# CSS原理

[Web前端HTML5&CSS3笔记](https://www.yuque.com/u21195183/hfcamg)

#### 1. BFC原理及使用

1. **BFC作用**
   - **清除浮动**：BFC会包含创建它的元素内部的所有内容（包含浮动元素）
   - **外边距折叠**：解决同一BFC容器中的相邻元素间的外边距折叠问题
   - **左图右文布局**：利用浮动元产生BFC以及BFC之间不会互相覆盖实现左图右文布局
2. **如何产生BFC**

| 名称         | 如何产生                                       | 备注                     |
| ------------ | ---------------------------------------------- | ------------------------ |
| 弹性元素     | display属性为flex或inline-flex元素的直接子元素 | 非常重要（flex布局常用） |
| 浮动元素     | 元素的float属性不是none                        | 常用                     |
| 绝对定位元素 | position属性为absolute或fixed                  | 常用                     |
| 行内块元素   | display属性为inline-block                      | 常用                     |
| overflow属性 | overflow属性值不为visible的元素                | 常用                     |

3. **如何产生BFC**

   ##### **普通流 ，浮动，绝对定位**

   ##### BFC产生作用的原因

   ##### **其实**BFC是上面三种布局方式中的普通流，BFC会产生一个独立的容器，该容器内部的元素不会在布局上影响到外部的元素，在外部的普通流看来它和其他普通流元素无差别，文档最终会按照上面说的普通流计算布局

   #### 清除浮动防止高度塌陷

![高度塌陷](https://user-gold-cdn.xitu.io/2020/3/5/170aa72d8722ee17?imageView2/0/w/500/h/960/format/webp/ignore-error/1)

```html
<div class="container">
  <div class="box box1"></div>
</div>

.box {
  width: 20px;
  height: 50px;
  float: left; // 脱离了文档流形成了一个BFC
	border: 4px solid green;
}
// 采用上述产生BFC元素的方法之一使外层元素产生BFC，可以防止元素高度塌陷。

.container {
	overflow: hidden; // 外层容器产生BFC
}
```

![修复高度塌陷](https://user-gold-cdn.xitu.io/2020/3/5/170aa735575a3914?imageView2/0/w/500/h/960/format/webp/ignore-error/1)

#### 处理外边距折叠的问题

在普通文档流中，元素（非BFC元素）的外边距margin会自动折叠，产生如下现象。

![外边距折叠](https://user-gold-cdn.xitu.io/2020/3/5/170aa73c8bd7c75b?imageView2/0/w/800/h/960/format/webp/ignore-error/1)

```css
<div class="container">
  <div class="box box1 m20"></div>
  <div class="box box2 m20"></div>
</div>

.m20 {
  margin: 20px;
}
.box {
  border: 1px solid green;
}

// 使两个box形成BFC或者分别用两个BFC包裹box，然后形成的两个BFC之间的外边距不会折叠

.box {
  overflow: hidden; // 使得两个box成为BFC元素
  border: 4px solid green;
}
```

![修复外边距折叠](https://user-gold-cdn.xitu.io/2020/3/5/170aa742e9a64b7d?imageView2/0/w/800/h/960/format/webp/ignore-error/1)

#### 常见问题分析 清除浮动

##### 为什么overflow: hidden可以清除浮动？

overflow: hidden使得外层元素产生了一个BFC，BFC的高度计算包含其内部的浮动元素，从而达到清除浮动效果

```css
// 采用after伪元素实现
.clearfix::after {
  content: " ";
  display: block;
  height: 0;
  clear: both;
}
.clearfix {
  zoom: 1;
}
```



#### display: inline-block. 

即有block属性，又有inline属性 可以设置上下行高， 又不会撑满一整行



#### Box-Sizing

用来设置盒子尺寸的计算方式（设置width和height的作用）

​	可选值：

​		content-box 默认值，宽度和高度用来设置内容区的大小

​		border-box 宽度和高度用来设置整个盒子可见框的大小



#### Reset CSS和Normalize CSS的作用和区别

**作用：**

Reset CSS和Normalize CSS都是重置浏览器自带样式。

**区别：**

**reset** 的目的，是将**所有**的浏览器的自带样式**重置**掉，这样更易于保持各浏览器渲染的一致性。

**normalize** 的理念则是**尽量保留**浏览器的默认样式，不进行太多的重置。

最主要的区别是Normalize.css保留不同浏览器同标签相同的默认值，只重置不同默认样式的差异，可以说css reset的高级版。



#### 清除浮动原理

clear ： 设置清除浮动后，浏览器会自动为元素添加一个外边距，以使其位置不受其他元素的影响

```css
clear: right
clear: left
clear：both //自动生成一个margin-top防止重叠

.XXX::after{
    content：'';
    display: block; //after默认是行内元素，所以要转换成block
    clear: both;
}
```



#### 清除外边距重叠和高度塌陷(多功能类)

```css
.clearfix::before,
.clearfix::after{
	content:'';
	display: table; //比block好，可以同时解决高度塌陷和重叠，block只能解决高度塌陷
	clear: both;
}

<div class="box1 clearfix"> //使用方法
```



#### 垂直居中

```css
.parent{
	position: relative;
}

.child{
	width: 100px;
	height: 100px;
	position: absolute;
	margin: auto;
	top:0;
	bottom:0;
	left:0;
	right:0;
}
```



#### 文本处理

```css
.box2{
	width: 200px;
	white-space: hidden;
	text-overflow: ellipsis;
}
```



#### 雪碧图

所有状态图片放在一个图片里，比如hover，active， link 状态图片放在一个图片里

```css
a:link{
	display: block;
	width: 93px;
	height: 29px;
	background-image：url('...')
}

a:hover{
    background-position: -93px 0;
}

a:hover{
    background-position: -186px 0;
}
```



#### Flex Box

align-items, align-content, align-self;





#### transition 过渡动画

 - 通过过渡可以指定一个属性发生变化时的切换方式
 - 通过过渡可以创建一些非常好的效果

```css
transition-property： 指定要执行的过渡的属性
多个属性用，隔开
如果所有属性都需要过渡，则用all关键字
大部分属性都支持过渡
transition-property：width, height;
transition-duration: 指定过渡效果的持续时间
transition-duration: 2s
transition-timing-function: 过渡时序函数
    ease 默认值 慢速开始，先加速再减速
    linear：匀速运动
    ease-in： 加速运动
    ease-out： 减速运动
    ease-in-out：先加后减速运动
	steps(2,end) 分2步 在时间结束时执行过渡
transition-delay: 过渡效果延迟
```



#### Animation 和 keyFrames 动画和关键帧

```css
.box2{
    // 要对当前元素生效的关键帧的名字
    animation-name:test;
    animation-duration:
}

@keyframes test{
    //动画开始位置
    to{}
    
    //动画结束位置
    from{}
}

// animation-iteration-count: infinite; 执行次数
// animation-direction: normal 默认值 从from到to运行
						reverse 从to到from运行
						alternate 从from向to运行 重复执行时动画时反向
						alternate-reverse 从to向from运行 重复执行时动画时反向
```

