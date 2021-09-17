function hex2rgb(hex) {
  let rgbarr = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(sRGB)

  if (rgbarr === null) {
    return sRGB
  } else {
    let rgb = []
    rgbarr.splice(1, 4).forEach(ele => {
      if (ele > 255 || ele < 0) {
        return sRGB
      } else {
        let a = parseInt(ele).toString(16)
        if (a.length < 2) {
          rgb.push('0' + a)
        } else {
          rgb.push(a)
        }

      }
    })
    return '#' + rgb.join('')
  }
}

// console.log(rgb2hex('rgb(255,255,100)'));



let arr = ['1', '2', '3', '4', '5', '6']

function reverse(arr) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[arr.length - i - 1]);
  }
  return newArr;
}


function endsWithVowel(str) {
  let newArr = [...str]
  console.log(newArr[newArr.length - 1]);
  if (
    newArr[newArr.length - 1] === 'a' ||
    newArr[newArr.length - 1] === 'e' ||
    newArr[newArr.length - 1] === 'i' ||
    newArr[newArr.length - 1] === 'o' ||
    newArr[newArr.length - 1] === 'u'
  )
    return true;
  else {
    return false;
  }
}

function namespace(oNamespace, sPackage) {
  const newArr = sPackage.split('.');
  let result = oNamespace;
  for (let item of newArr) {
    if (typeof result[item] !== 'object') {
      result[item] = {}
    }
    result = result[item];
  }
  return oNamespace;
}

// console.log(namespace({ a: { test: 1, b: 2 } }, 'a.b.c.d'));


const str = 'abaasdffggghhhjjkkgfddsssss3444343';

function longChar(str) {
  const obj = {}
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (obj[char]) {
      obj[char]++;
    } else {
      obj[char] = 1;
    }
  }
  console.log(obj);
  let objChar = '';
  let max = 0;
  for (let j in obj) {
    if (obj[j] > max) {
      max = obj[j];
      objChar = j;
    }
  }
  console.log(objChar, max);
}

console.log(longChar(str));
