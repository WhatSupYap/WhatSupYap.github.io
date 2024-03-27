function xCalPer(start, end, ing) {
  //var 문제개수 = end - start + 1;

  var x = end - start + 1;
  var y = ing - start + 1;
  var z = y / x * 100;
  var per = "";
  var star = "";

  if (100 == z) { per = "10000"; star = "★★★" }
  else if (90 < z) { per = "9199"; star = "★★☆" }
  else if (80 < z) { per = "8190"; star = "★★☆" }
  else if (70 < z) { per = "7180"; star = "★☆☆" }
  else if (60 < z) { per = "6170"; star = "★☆☆" }
  else { per = "0060"; star = "☆☆☆" }
  var rst = "<span class=\"per" + per + "\">" + star + "</span>";
  document.write(rst);
}

function xIsEmpty(p) {
  if (typeof p === "undefined") {
    return true;
  }
  else if (p.toString() === "") {
    return true;
  }
  return false;
}