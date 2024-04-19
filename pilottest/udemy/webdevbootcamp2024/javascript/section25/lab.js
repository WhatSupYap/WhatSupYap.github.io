//------------------------------------------------------------
// 강의 265
//------------------------------------------------------------
const sct265 = document.querySelector("section[lab='265']");
//sct265.style.backgroundColor = makeRandomColor();

for (let i = 0; i < 100; i++)
{
    const btnColor = document.createElement("button");
    btnColor.append("click");
    btnColor.addEventListener("click", function () {
        this.style.backgroundColor = makeRandomColor();
    });
    sct265.querySelector("article").appendChild(btnColor);
}


//------------------------------------------------------------
// 강의 264
//------------------------------------------------------------
const btn264 = document.querySelector("#btn264");
btn264.addEventListener("click", () => {
    document.body.style.backgroundColor = makeRandomColor();
    
});


//------------------------------------------------------------
// 강의 263
//------------------------------------------------------------
const divPaper = document.querySelector("#divPaper");
function setABC() {
    const innerHTML = divPaper.innerHTML;
    divPaper.innerHTML = innerHTML + "<br>ABC";
}

function setEFG() {
    const innerHTML = divPaper.innerHTML;
    divPaper.innerHTML = innerHTML + "<br>EFG";
}

const btnOnclick = document.querySelector("#btnOnclick");
const btnAddEventListener = document.querySelector("#btnAddEventListener");

btnOnclick.onclick = setABC;
btnOnclick.onclick = setEFG;

btnAddEventListener.addEventListener("click", setABC);
btnAddEventListener.addEventListener("click", setEFG);

//------------------------------------------------------------
// 강의 262
//------------------------------------------------------------
const img262 = document.getElementById("img262");
img262.onclick = () => {
    const url262_1 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    let arrl262 = img262.src.split("/");
    let nol262 = arrl262[arrl262.length - 1].replaceAll(".png", "");

    const url262_2 = (Number(nol262) + 1).toString() + ".png";
    img262.src = url262_1 + url262_2;
    // img262
}
function l262Minus() {
    const url262_1 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    let arrl262 = img262.src.split("/");
    let nol262 = arrl262[arrl262.length - 1].replaceAll(".png", "");

    const url262_2 = (Number(nol262) - 1).toString() + ".png";
    img262.src = url262_1 + url262_2;
}

img262.onmouseleave = l262Minus;
