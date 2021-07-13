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

```HTML
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

