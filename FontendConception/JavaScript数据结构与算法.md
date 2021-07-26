# JavaScript数据结构与算法

#### Stack 栈

先进先出

非递归，用栈方法实现dfs

```js
var preorderTraversal = function(root) {
    const res = []
    const stack = []

    if(root) stack.push(root)
    while(stack.length){
        let a = stack.pop()
        res.push(a.val)
        if(a.right) stack.push(a.right)
        if(a.left) stack.push(a.left)
    }
    return res;
};
```



#### 链表LinkedList

使用Object实现链表

```js
const a = {value: 'a'}
const b = {value: 'b'}
const c = {value: 'c'}
const d = {value: 'd'}
a.next = b;
b.next = c;
c.next = d;

//遍历链表
let p = a;
while(p){
    console.log(p.value);
    p = p.next;
}

//插入
const e = {value: 'e'}
c.next = e;
e.next = d;
```





#### Tree树

深度优先遍历

口诀：访问根节点

对根节点的 children 挨个进行深度优先遍历

![二叉树先序列遍历-gif动画演示](https://www.zhoulujun.cn/uploadfile/images/2020/02/20200202115149409914573.gif)

```js
const tree = {
	val: 'a'
	children:[
		{
            val: 'b'
            children:[
    			{
                    val: 'd'
                    children:[]
                },
                {
                    val: 'e'
                    children:[]
                }, 
    		]
		},
        {
            val: 'c'
            children:[
    			{
                    val: 'f'
                    children:[]
                },
                {
                    val: 'g'
                    children:[]
                }, 
    		]
		}, 
	]
}

const dfs = (root) {
    console.log(root.val)
    root.children.forEach(dfs);
}

dfs(tree)
```





广度优先遍历

![2.gif](https://ucc.alicdn.com/pic/developer-ecology/f799f2d3440f4cddb47d0b1e28d8198d.gif)

新建一个队列，把根节点入队

把队头出队并访问

把队头的children挨个入队

重复2，3直到队列为空

```js
const bfs = (root) => {
	const q = [root];
    while(q.length>0){
       	const n = q.shift();
        console.log(n.val)
        n.children.forEach(child =>{
            q.push(child)
        } )
    }
}
```

