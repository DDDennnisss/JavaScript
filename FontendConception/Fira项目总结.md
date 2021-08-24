# Fira 项目总结

### 1. npx

npx可以让你直接使用npm 里的包 而不用手动全局安装



### 2. 项目配置代码规范

lint-staged

prettier



### 3. .env 和 .env.development

```js
//.env
REACT_APP_API_URL = http://online.com

//.env.development
REACT_APP_API_URL = http://localhost:3000.com
```

当运行 `npm start` webpack会识别`.env.development`, 当运行 `npm run build` webpack会识别`.env` **自动化切换环境变量**



### 4. 常见的Mock方案

#### 4.1 请求拦截 Mock.js

​	优点：1. 与前端代码分离  

​				2. 可生成随机数据

​	缺点：1. 数据都是动态生成的假数据，无法模拟增删改查

​				2. 只支持ajax，不支持fetch

#### 4.2 接口管理工具

rap，swagger，moco，yapi

​	优点：1. 配置功能强大，接口管理与mock一体，后端修改接口Mock也改，可靠

​	缺点：1. 配置复杂，依赖后端，可能会出现后端不愿意出手，或者等配置完了，接口也开发出来了的情况

​				2. 一般会作为大团队的基础建设而存在，没有这个条件请慎重考虑

#### 4.3 本地node服务器

代表：json-server

优点：1. 配置简单，30秒启动REST API Server

   			2. 自定义程度高，一切尽在掌控中
   			3. 增删改查真实模拟

缺点： 

​	1.与接口管理工具相比，无法随后端API修改而自动修改

```
yarn add json-server
然后
创建__json_server_mock__文件，里面创建db.json
最后
在script里加入 "json-server": "json-server __json_server_mock__/db.json --watch"
```



### 5. SearchPanel

```js
// 异步抓取数据
const apiUrl = process.env.REACT_APP_API_URL

useEffect(()=>{
	fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.personId}`).then(response => {
		if(response.ok){
		setList(response.json())
		}
	})
})


```



### 6. CleanObject

避免param里的空数组

```js
export const isFalsy = (value) => value === 0 ? true: !! value
//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
    const result = {...object}
    Object.keys(result).forEach(key =>{
        const value = result[key]
        if(isFalsy()){
            delete result[key]
        }
    })
    return result
}
```



#### 7. env 和 env.development 自动化切换

```js
// .env 部署上线地址
REACT_APP_API_URL = http://online.com

// .env.development 部署开发地址
REACT_APP_API_URL = http://localhost:3001

//使用
const apiUrl = process.env.REACT_APP_API_URL
fetch(`${apiUrl}`/projects).then(async res =>{
    if(res.ok){
        setList(await res.json())
    }
},[param])
```



### 8. 自定义 Custom hook 复用代码

最优秀的代码复用方案

```react
const useMount = (callback) =>{
	useEffect(()=>{
		callback()
	},[])
}

//使用，不需要写[]参数了 
useMount(()=>{
	...
})

// 用法
const debounceParam = useDebounce(param,2000)

// useDebounce
export const useDebounce = (value, delay){
    const [debounceValue, setDebounceValue] = useState(value)
    
    useEffect(()=>{
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout(()=>setDebounceValue(value),delay)
        // 每次再上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    },[value, delay])
    
    return debounceValue;
}
```



### 9. qs.stringify()

```react
//如果后端返回的是name1，name2... 就需要写很多search
useEffect(()=>{
	fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.personId}`).then(response => {
		if(response.ok){
		setList(response.json())
		}
	})
})

//使用qs就能实现自动转换
useEffect(()=>{
	fetch(`${apiUrl}/projects?name=${qs.stringify(param)}`).then(response => {
		if(response.ok){
		setList(response.json())
		}
	})
})
```



