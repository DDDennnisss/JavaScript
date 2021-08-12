# HTML

#### 行内元素 (inline element)

- 行内元素主要是用来包裹元素，主要使用<span>

  

#### 块元素 (block element)

- 在网页中一般通过块元素对页面进行布局 <div>

- 一般情况下会在块元素中放行内元素，而不会在行内中放块元素
- `p`元素中不能放任何块元素
- 块元素中基本什么都能放

浏览器在解析网页时，会自动对网页不规范的内容进行修正

​	比如：标签写在了根元素的外部

​				p元素中嵌套了块元素

​				根元素中出现了除head和body以外的子元素

`img`属于替换元素，基于块与行之间

多使用webp格式 图片转化为base64 网上有工具，



#### 内联框架

iframe 可以引入一个别的网站

audio 音频加入



#### JavaScript HTML DOM 元素 (节点)新增，编辑，删除

createElement，createTextNode，appendChild，insertBefore，removeChild，replaceChild

```
<div id="div1">
<p id="p1">这是一个段落。</p>
<p id="p2">这是另外一个段落。</p>
</div>
<script>
var para = document.createElement("p");  //创建p标签
var node = document.createTextNode("这是一个新的段落。");  //添加文本节点
para.appendChild(node);  //向p标签添加文本节点（内容）
var element = document.getElementById("div1");
element.appendChild(para);  //添加到已存在的元素中
```

![img](https://img-blog.csdnimg.cn/2018120418272910.png)

**要移除一个元素，你需要知道该元素的父元素。**

```html
<div id="div1">
<p id="p1">这是一个段落。</p>
<p id="p2">这是另外一个段落。</p>
</div>
<script>
var parent = document.getElementById("div1");
var child = document.getElementById("p1");
parent.removeChild(child);
```

![img](https://img-blog.csdnimg.cn/20181204182825563.png)

使用 replaceChild() 方法来替换 HTML DOM 中的元素。

```
<div id="div1">
<p id="p1">这是一个段落。</p>
<p id="p2">这是另外一个段落。</p>
</div> 
<script>
var para = document.createElement("p");
var node = document.createTextNode("这是一个新的段落。");
para.appendChild(node);
var parent = document.getElementById("div1");
var child = document.getElementById("p1");
parent.replaceChild(para, child);
```

![img](https://img-blog.csdnimg.cn/20181204183040123.png)

字符编码

XXXX -> 10110010101 编码

10110010101-> XXXX  解码

常见字符集

UTF-8,

