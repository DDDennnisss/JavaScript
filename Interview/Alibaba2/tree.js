const tree = {
  left: {
    left: { value: 3 },
    right: { value: 4 },
    value: 1
  },
  right: {
    left: { value: 5 },
    right: { value: 6 },
    value: 2
  },
  value: 0
};
// 出参格式参考：
// const values = [0, 1, 3, 4, 2, 5, 6];

let result = [];
function buildTree(obj) {
  if (!obj) return;
  result.push(obj.value)
  buildTree(obj.left)
  buildTree(obj.right)
  return result;
}
