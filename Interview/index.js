
class QueueElement{
  constructor(ele, priority){
    this.ele = ele;
    this.priority = priority;
  }
}

const result = []

function enqueue(ele, priority){
  let q = new QueueElement(ele, priority)

  for(let i = 0; i< result.length; i++){
    if(result[i].priority>q.priority){
      result.splice(i, 0, q)
    }
  }
  return result;
}


function dequeue(){
  if(result.isEmpty()){
    return;
  }
  return result.shift()
}

Function.prototype.myBind = function(){
  let self = this;
  let args = Array.prototype.slice.call(arguements)
  let thisValue = args.shift()
  return function(){
    return self.apply(thisValue, args)
  }
}

function debounce(fn,delay){
  let timer;
  return function(){
    let args = arguments;
    let that = this;
    timer = setTimeout(function(){
      fn.apply(that,args)
    },delay) 
  }
}

function flatFn(arr){
  return arr.reduce((res, item)=>{
    res.concat(Array.isArray(item)?flatFn(item):item)
  },[])
}

function deepClone(obj, cloneObj){
  let cloneObj = cloneObj || {}

  for(let i in obj){
    if(typeof obj[i] === 'object' && obj[i] !== null){
      cloneObj[i] = Array.isArray(obj[i])?[]:{}
      deepClone(obj[i], cloneObj[i])
    }else{
      cloneObj[i] = obj[i]
    }
  }
  return cloneObj;
}