let timeWorker = {}
let key = Symbol()
function mySetInterval(fn, timer) {
  const repeatFn = () => {
    fn();
    timeWorker[key] = setTimeout(() => {
      repeatFn()
    }, timer)
  }
  console.log();
  setTimeout(repeatFn, timer);
  return key;
}

const myClearInterval = function (key) {
  if (key in timeWorker) {
    clearTimeout(timeWorker[key])
    delete timeWorker[key]
  }
}

const a = mySetInterval(() => {
  console.log('test1');
}, 2000)
const b = mySetInterval(() => {
  console.log('test2');
}, 2000)

setTimeout(() => {
  myClearInterval(a)
}, 4000)