# HTML

### 1. 行内元素 (inline element)

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



### 2. JavaScript HTML DOM 元素 (节点)新增，编辑，删除

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



### 3. 防止html代码转义为字符串

防止转义dangerouslySetInnerHTML

```html
<Content dangerouslySetInnerHTML={{ __html: this.props.content }} />

const defaultState = fromJS({
  "title": "衡水中学，被外地人占领的高考工厂",
  "content": "<img src='https://auto.epochtimes.com/uploaded_files/2017/6-20/4bb7f2ef74b948b99cd8c2ae20b0060d.jpg'/><p><b>2017年，衡水中学考上清华北大的人数是176人</b>，2016年是139人，再往前推到2015年，这个人数是119人。但是在这些辉煌的名单背后。</p>"
})
```



### 4. 检测浏览器是否支持HTML5功能

- 在全局对象上检测属性；
- 在创建的元素上检测属性；
- 检测一个方法是否返回期望值；
- 检测元素是否能保留值;

**1. 在全局对象上检测属性**

```html
<script>
        window.onload = function() {
            if (window.applicationCache) {
                document.write("Yes, your browser can use offline web applications.");
            } else {
                document.write("No, your browser cannot use offline web applications.");
            }
        }
</script>
```

**2. 在创建的元素上检测属性**

首先要创建一个元素，再检测其能否为DOM识别。比如，通过测试canvas元素的context属性，检测浏览器是否支持canvas元素：

```html
<script type="text/javascript">
        window.onload = drawSquare;

        function drawSquare () {
            var canvas = document.getElementById('Simple.Square');
            if (canvas.getContext) {
                var context = canvas.getContext('2d');

                context.fillStyle = "rgb(13, 118, 208)";
                context.fillRect(2, 2, 98, 98);
            } else {
                alert("Canvas API requires an HTML5 compliant browser.");
            }
        }
</script>
<body>
    <canvas id="Simple.Square" width="100" height="100"></canvas>
</body>
```

**3. 检测一个方法是否返回期望值**

在创建的元素上检测属性”所述那样，先检测是否支持该元素（比如video），再检测方法是否返回期望值：

```html
<script>
        function videoCheck() {
            return !!document.createElement("video").canPlayType;
        }

        function h264Check() {
            if (!videoCheck) {
            document.write("not");
            return;
            }

            var video = document.createElement("video");
            if (!video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) {
                document.write("not");
            }
            return;
        }

        document.write("Your browser does ");
        h264Check();
        document.write(" support H.264 video.");
    </script>
```

**4. 检测元素是否能保留值**

```html
<script>
        function rangeCheck() {
            var i = document.createElement("input");
            i.setAttribute("type", "range");
            if (i.type == "text") {
                document.write("not");
            }
            return;
        }

        document.write("Your browser does ");
        rangeCheck();
        document.write(" support the <code><input type=range></code> input type.");
    </script>
```

