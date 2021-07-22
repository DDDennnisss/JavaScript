//去重
const arr = [1,1,1,2,2,2,3,3,3,3]
const arr2 = [...new Set(arr)];

console.log(arr2)

const set = new Set([1,2,3])
const has = set.has(3)

console.log(has);

const set2 = [...new Set([1,2,3,4])].filter(item=>set.has(item))