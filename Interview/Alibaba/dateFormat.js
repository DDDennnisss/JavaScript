// function dateFormat() {
//   var date = new Date();
//   var year = date.getFullYear();
//   var month = date.getMonth() + 1;
//   var strDate = date.getDate();
//   if (month >= 1 && month <= 9) {
//     month = "0" + month;
//   }
//   if (strDate >= 0 && strDate <= 9) {
//     strDate = "0" + strDate;
//   }
//   var currDate = year + '-' + month + '-' + strDate;
//   console.log(currDate);
// }
// dateFormat()


//来自 https://blog.csdn.net/qq_45315910/article/details/103529394 谢谢大佬
Date.prototype.Format = function (fmt) { //author: meizz   
  var o = {
    "M+": this.getMonth() + 1, //月份   
    "d+": this.getDate(), //日   
    "H+": this.getHours(), //小时   
    "m+": this.getMinutes(), //分   
    "s+": this.getSeconds(), //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
    "S": this.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


var time0 = new Date().Format("yyyy年MM月dd日");
var time1 = new Date().Format("yyyy/MM/dd");
var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
console.log(time0);
console.log(time1);
console.log(time2);