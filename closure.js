// function books() {
//   var book = "books good";
//   return function () {
//     console.log(book);
//   }
// }

// var bag = books();
// bag();

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i++);
  }, 4000)
}
console.log(i); //5,5,6,7,8,9