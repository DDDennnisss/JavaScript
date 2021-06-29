function keywordscolorful(str, key) {
  var reg = new RegExp("(" + key + ")", "g");
  var newstr = str.replace(reg, "<font style='background:#ff0;'>$1</font>");
  return newstr;
}