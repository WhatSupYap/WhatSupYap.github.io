const now = new Date();
const year = now.getFullYear();
const month = ("00" + (now.getMonth() + 1)).right(2); // 월은 0부터 시작하기 때문에 1을 더합니다.
const day = ("00" + now.getDate()).right(2);
const hour = ("00" + now.getHours()).right(2);
const minute = ("00" + now.getMinutes()).right(2);
const second = ("00" + now.getSeconds()).right(2);

const spanToday = document.querySelector("#today");

if(spanToday !== undefined) spanToday.innerHTML = `${year}.${month}.${day}`;
