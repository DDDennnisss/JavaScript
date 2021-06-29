const origin = "i3aasmc5gbtgf3aqw3yvt0louehmzs4ywioaqscvrgytn";
// 出参格式参考：
// const result = "iambatman";

function decrypt(pwd) {
  let counter = 0;
  const newArr = [];
  for (let i = 0; i < pwd.length; i = i + 1 + counter) {
    newArr.push(pwd[i])
    counter++;
  }
  return newArr.join("")
}
console.log(decrypt(origin))