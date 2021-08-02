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

