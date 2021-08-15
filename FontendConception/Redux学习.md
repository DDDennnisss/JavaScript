# Redux 学习

Q&A

1. 为什么要用回调(solved)

   因为「我」没有调用过这个函数，是浏览器在用户点击 button 时调用的。

```react
onClick = { () => this.props.deleteItem(index) }

removeItem(index) {
  const list = this.state.list;

  list.splice(index, 1);
  this.setState({ list });
}

<ul>{
  this.state.list.map((text, i) => {
          return (
            <li key={i}>
              {text}
              <button onClick={() => this.removeItem(i) }>-</button>
            </li>
          );
        })}
      </ul>
```

2. actionCreators.js

   ```
   ```

   



### 1. Redux基本使用

![How to interact with the Redux store in a React app | by Rafael Cruz |  Medium](https://miro.medium.com/max/1176/1*NTKLDEcb018jQIjILxtp4Q.png)

action dispatch (类似仓库管理员)

创建store (类似仓库)

```js
import {createStore} from 'redux';
import reducer from './reducer'

const store = createStore(reducer)
export default store
```

创建Reducer (类似仓库管理软件) 处理业务逻辑

```react
const defaultState = {
    inputValue: 'Write Something',
    list:[
        '1',
        '2',
        '3'
    ]
}
export default (state = defaultState,action) =>{
    
    // 可以监控到action变化
    conosole.log(state,action)
    
    //Reducer里只能接受state, 不能改变state
    if(action.type === 'changeInput'){
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value;
 		//返回给store
        return newState
    }
	return state
}

/*
export default (state = initState, action) => {
    switch(action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                type: LOGIN,
                data: action.params
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                type: LOGIN_SUCCESS,
                data: action.data
            })
        case LOGIN_ERROR:
            return Object.assign({}, state, {
                type: LOGIN_ERROR,
                data: action.data
            })
        default:
            return state
    }
}
*/
```

Component里使用

```js
import store from './store'

//可以在组件内用this.state.STORE里的属性
constructor(props){
    super(props)
    this.state = store.getState()
    this.changeInputValue = this.changeInputValue.bind(this)
    
    //订阅store
    this.storeChange = this.storeChange.bind(this)
    store.subscribe(this.storeChange)
}

//建立action, 在reducer里调用
changeInputValue(e){
    const action = {
        type: 'changeInput',
        value: e.target.value
    }
    store.dispatch(action)
}

//声明改变状态
storeChange(){
    this.setState(store.getState)
}
```



将action type 单独放在一个文件里重命名,可以更好的找出错误 `actionTypes.js`

```js
export const CHANGE_INPUT='changeInput'
export const ADD_ITEM ='addItem'
export const DELETE_ITEM='deleteItem'
```



将action从reducer里分离出来,创建 `actionCreators.js` 统一管理actions

```js
import {CHANGE_INPUT} from './actionTypes.js'

export const changeInputAction = (value) =>{
    type:CHANGE_INPUT,
    value
}
```



### 2. Redux常见问题

​	2.1 Store 必须是唯一的

​	2.2 只有store能改变自己的内容，Reducer不能改变

​	2.3 Reducer必须是纯函数

​		纯函数：如果函数的调用参数相同，则永远返回相同的结果。它不依赖于程序执行期间函数外部如何状态或数据的变化，必须只依赖于其输入参数。

​		简单理解： `reducer` 返回的结果必须是由 `action` 和 `state` 决定的, 不能赋值或者new Date，ajax一类的操作。



```js
onClick = { () => this.props.deleteItem(index) } // 给父组件传delete方法
```

  2.4 无状态组件

​	无状态组件可以省略掉this，性能也会高很多，也没有state，业务逻辑，只有UI, 类似于hooks

```react
const TodoListUI = (props) => {
	...
}
```



### 3. Redux和axios获取数据

```react
//TodoList.js
componentDidMount(){
	axios.get('...').then((res)=>{
		const data = res.data
        const action = getListAction(data)
        store.dispatch(action)
	})
}

// actionCreators.js
export const getListAction = (data) =>{
    type: GET_LIST,
    data
}

// reducer.js
if(action.type === GET_LIST){
    let newState = JSON.parse(JSON.stringify(state))
    newState.list = action.data.data.list
    return newState
}
```



### 4. Redux-chunk 和 Redux-saga 中间件

**所有的 side effect 操作，例如调用 api 获取数据等等都将在这里完成。**然后再经由 reducer 更新 state，最后传递到 view 完成 MVC 的数据流循环。

![img](https://img0.baidu.com/it/u=3659086970,512947615&fm=26&fmt=auto&gp=0.jpg)

#### 4.1 **Redux-thunk安装**

```
npm i redux-thunk
```



#### 4.2 **thunk配置**

```react
// store/index.js
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

//增强函数，可以理解为链式函数
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose // compose 接下来继续执行另一个函数，这里是指applyMiddleware(thunk)

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(
    reducer,
    enhancer
)
export default store
```



普通action: 

```js
export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}
```

而 redux-thunk 的 action 可以是一 异步的 higher order function 高阶函数

```js
export const fetchData = args => async (dispatch, getState) => {
  const state = getState();
  const url = 'https://jsonplaceholder.typicode.com/users/' + args;

  try {
    const response = await fetch(url)
      .then(resp => {
        return resp;
      })
      .then(resp => resp.json());

    dispatch({
      type: REMOTE_DATA_RECEIVED,
      data: response
    });
  } catch (error) {
    console.log(error);
  }
};
```



#### 4.3 **Redux-saga解决方案**

中间件注册

```js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';
import { watchFetchSaga } from './saga/fetchData.saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchFetchSaga);
```

但是 saga 使用的仍然是普通的 action

```JS
// 这个 action 将由 saga 监听，并且出发 side effect 异步加载 api 操作
export const fetchData = () => ({
  type:  "START_FETCH_DATA"
});

// 这个 action 将由 saga 发出
export const fetchSuccess = data => ({
  type: "REMOTE_DATA_RECEIVED",
  payload: data
});
```

接下来就是注册 saga 相关 side effect 操作。下面的文件是 fetchData.saga.js

```JS
import { takeLatest, put } from "redux-saga/effects";

function* fetchDataSaga(action){
  try {
    const response = yield fetch(action.url);
    const data = yield response.json()
    yield put(fetchSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export default function* watchFetchSaga(){
  // saga 将监听此事件，takeLatest 表示仅仅只监听最新的此事件
  yield takeLatest("START_FETCH_DATA", fetchDataSaga)
}
```

