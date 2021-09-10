function hex2rgb(hex) {
  let n = [];
  let newArr = [];
  if (hex.length === 4) {
    n = hex.split('', 4).splice(1);
    for (let i in n) {
      result = parseInt(n[i], 16) * 16 + parseInt(n[i], 16)
      newArr.push(result)
    }
  } else if (hex.length === 7) {
    n = hex.split('', 7).splice(1);
    for (let i = 0; i < n.length; i = i + 2) {
      result = parseInt(n[i], 16) * 16 + parseInt(n[i + 1], 16)
      newArr.push(result)
    }
  }
  return "rbg(" + newArr.toString() + ")";
}



let arr = ['1', '2', '3', '4', '5', '6']

function reverse(arr) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[arr.length - i - 1]);
  }
  return newArr;
}

console.log(reverse(arr));