//self calling functions

(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 10 - goodLuck);
})(5);