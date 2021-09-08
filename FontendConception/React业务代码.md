# React 业务代码



### 1. 一个handle处理两个input

```js
constructor(props){
	super(props)
	this.state = {
        isGoing: true,
        numberOfGuests: 2
	}
   	
    this.handleInputChange = this.handleInputChange.bind(this);
}

//一个handle处理两个input，通过event.target.name来区别
handleInputChange(event){
    const value = event.target.name = "isGoing" ? event.target.checked : event.target.value
    
    this.setState({
        [event.target.name]: value
    })
}

render(){
    return(
    <input
        name="isGoing"
        type="checkbox"
        checked={this.state.isGoing}
		onChange={this.handleInputChange}
	/>
            
    <input
        name="numberOfGuests"
        type="number"
		value = {this.state.numberOfGuests}
		onChange={this.handleInputChange}
	/>        
    )
}
```



### 2. props兄弟传值

- `props.children`：获取组件的内容，比如：
  - `<Hello>组件内容</Hello>` 中的 `组件内容`

```react
class Brother1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
        <button onClick={this.props.refresh}>
            更新兄弟组件
        </button>
      </div>
    )
  }
}
class Brother2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
         {this.props.text || "兄弟组件未更新"}
      </div>
    )
  }
}
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  refresh(){
    return (e)=>{
      this.setState({
        text: "兄弟组件沟通成功",
      })
    }
  }
  render(){
    return (
      <div>
        <h2>兄弟组件沟通</h2>
        <Brother1 refresh={this.refresh()}/>
        <Brother2 text={this.state.text}/>
      </div>
    )
  }
}
```



### 3. 组件异步加载lazy和suspense

```js
import React, {Component, lazy, Suspense} from 'react';

const Sub = lazy(()=>import('./Sub'))

//父组件
<div>
    <Suspense fallback={<div>loading</div>}>
            <Sub />
    </Suspense>
</div>
```



### 4. 常用hooks

#### 4.1 useParams

`useParams`返回URL参数的键/值对的对象。使用它来访问当前`<Route>的match.params`。

```react
//normal
function BlogPost({ match }) {
  let { slug } = match.params;
  return <div>{slug}</div>;
}

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/blog/:slug" component={BlogPost} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);

// useParams
function BlogPost() {
  let { slug } = useParams();
  return <div>{slug}</div>;
}

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/blog/:slug">
          <BlogPost />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);
```

在Route中我们可以不用写烦人的component了，只要记得用把页面包裹起来就行了，同时useParams的组件中也不用再写{match}了。

同时嵌套路由也变得更加简单了，我们如果需要两个params参数的话，只要在useParams中传递结构得到两个参数即可。



#### 4.2 useLocation

这个钩子函数顾名思义，可以查看当前路由：

```react
function BlogPost() {
  const { slug } = useParams();
  const location = useLocation();
  console.log(location);
  return <div>{slug}</div>;
}

// 控制台输出
Object {pathname: "/blog/4", search: "", hash: "", state: undefined}
pathname: "/blog/4"
search: ""
hash: ""
state: undefined
```



### 5. JSX语法细节

#### 5.1 class 用 className代替， for 用 htmlFor代替

#### 5.2 useMemo 就是 classComponents 的 PureComponent



### 6. 动态路由传参

#### 6.1 通过Params实现动态路由

```js
// App.js 设置动态路由
<Route path='/detail/:id' exact component={Detail}></Route>

// Detail/index.js
componentDidMount() {
    this.props.getDetail(this.props.match.params.id) //获取到路由id
}

// actionCreators.js 根据id配合后端提取对应数据
export const getDetail = (id) => {
  return (dispatch) => {
    axios.get('/api/detail.json?id=' + id).then((res) => {
      const result = res.data.data
      dispatch(changeDetail(result.title, result.content))
    })
  }
}

// 用法
<Link key={index} to={'/detail/' + item.get('id')} />
```



#### 6.2 通过search实现动态路由

```js
// App.js 设置动态路由
<Route path='/detail' exact component={Detail}></Route>

// Detail/index.js
componentDidMount() {
    this.props.getDetail(this.props.location.search) //获取到路由id ?id=1需要自己处理id去拿2
}

// actionCreators.js 根据id配合后端提取对应数据
export const getDetail = (id) => {
  return (dispatch) => {
    axios.get('/api/detail.json?id=' + id).then((res) => {
      const result = res.data.data
      dispatch(changeDetail(result.title, result.content))
    })
  }
}

// 用法
<Link key={index} to={'/detail?id' + item.get('id')} />
```



### 7. 按需加载react-loadable

```react
import React from 'react';
import Loadable from 'react-loadable';
 
const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading(){
	return <div>正在加载</div>
  },
});
 
export default class App extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}

// App.js 改变引入路径就可以按需加载了
import Detail from './pages/detail/loadable.js';
```



### 7. Customer Hooks

```typescript
export const useArray = <T>(initialArray: T) =>{
    const [value, setValue] = useState(initialArray)
    return {
        value，
        setValue,
        add: (item: T) => setValue([...value,item]))
        clear: () => setValue([]),
        removeIndex: (num: number) => {
            const newArr = [...value];
            newArr.splice(num,1)
            setValue([newArr])
        }
    }
}
```
