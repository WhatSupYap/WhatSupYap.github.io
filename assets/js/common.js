function xIsEmpty(p) {
  if (typeof p === "undefined") {
    return true;
  }
  else if (p.toString() === "") {
    return true;
  }
  return false;
}