const dateFormat = (dateInput, format) => {
  let day = dateInput.getDate();
  let month = dateInput.getMonth() + 1;
  let year = dateInput.getFullYear()

  format = format.replace(/YYYY/, year)
  format = format.replace(/MM/, month)
  format = format.replace(/DD/, day)

  return format;
}

console.log(dateFormat(new Date('2020-12-01'), 'YYYY/MM/DD')) // 2020/12/01
console.log(dateFormat(new Date('2020-04-01'), 'YYYY-MM-DD')) // 2020/04/01
console.log(dateFormat(new Date('2020-04-01'), 'YYYY年MM月DD日')) // 2020年04月01日
