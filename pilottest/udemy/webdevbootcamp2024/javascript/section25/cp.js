let cp_no;
let section;
//------------------------------------------------------------
// 코딩연습 62
//------------------------------------------------------------
cp_no = 62;
section = document.querySelector(`section[cp="${cp_no}"]`);
const username = document.querySelector("#username");
username.addEventListener("input", (e) => {
    if (e.target.value === "")
    {
        section.querySelector("h1").innerText = "Enter Your Username";
    }
    else
    {
        section.querySelector("h1").innerText = "Welcome, " + e.target.value;
    }
    
    //document.querySelector("h1").innerText = username.value;
});

//------------------------------------------------------------
// 코딩연습 61
//------------------------------------------------------------
const form61 = document.querySelector("form");
const prd61 = document.querySelector("#product61");
const qty61 = document.querySelector("#qty61");
const ul61 = document.querySelector("#list61");
form61.addEventListener("submit", (e) => {
    e.preventDefault();
    const li = document.createElement("li");
    li.innerText = `product: ${prd61.value}, qty: ${qty61.value}`;
    ul61.appendChild(li);
    prd61.value = "";
    qty61.value = "";
});


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