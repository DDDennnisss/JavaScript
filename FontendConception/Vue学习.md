# Vue学习(慕课网)

### 1. TodoList基本语法:

```js
<input type = "text" v-model="inputValue" />
<button v-on:click="handleBtnClick">submit</buttom>
<ul>
    <li v-for="item in list">{{item}}</li>
</ul>

var app = new Vue({
	el:'app',
	data:{
		list:[],
		inputValue:''
	},
	methods:{
		handleBtnClick: function(){
			this.list.push(this.inputValue)
            this.inputValue = ''
		}
	}
})
```



### 2.父子传值

```Vue
// 从app传入TodoList
		<todo-list 
           v-bind:content = 'item' 
           v-for="(item,index) in list"
           v-bind:index = "index"
           @delete = 'handleItemDelete'
        ></todo-list>

var TodoList = {
	props:['content','index'],
	template:"<li @click='handleItemClick'>{{content}}</li>"，
	methods: {
		handleItemClick: function(){
			this.$emit('delete',this.index)
		}
	}
}

var app = new Vue({
	el:'app',
	data:{
		list:[],
		inputValue:''
	},
	methods:{
		handleItemDelete: function(index){
			this.list.splice(index,1)
		}
	}
})

```

