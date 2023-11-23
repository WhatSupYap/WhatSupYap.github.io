function xCalPer(start,end,ing)
{
  //var 문제개수 = end - start + 1;

  var x = end - start + 1;
  var y = ing - start + 1;
  var z = y / x * 100;
  var per = "";
  if (100 == z) per = "100";
  else if (90 <= z) per = "90";
  else if (80 <= z) per = "80";
  else if (70 <= z) per = "70";
  else per = "60";
  var rst = "<span class=\"per" + per + "\">●</span> " + y + "/" + x;
  document.write(rst);
}