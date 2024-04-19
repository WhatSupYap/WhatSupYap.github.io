//------------------------------------------------------------
// 코딩연습 60
//------------------------------------------------------------
const btnHello = document.querySelector("#hello");
const btnGoodBye = document.querySelector("#goodbye");

btnHello.addEventListener("click", () => {
    console.log("hello");
});

btnGoodBye.addEventListener("click", () => {
    console.log("goodbye");
});