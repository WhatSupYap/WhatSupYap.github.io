let lab_no = "000";
let section;
//------------------------------------------------------------
// 강의 270
//------------------------------------------------------------
lab_no = 270
section =  document.querySelector(`section[lab="${lab_no}"]`);

for (const btn of section.querySelectorAll("button.add"))
{
    btn.addEventListener("click", (e) => {
        const parent_ = e.target.parentElement;
        const table  = parent_.querySelector("table");
        let tbody = table.querySelector("tbody");
        if (tbody == null || tbody === undefined)
        {
            tbody = document.createElement("tbody");
            table.appendChild(tbody);
        }
        const tr = document.createElement("tr");
        const wowRandomCharacter = wow.getRandomCharacter();
        function makeTd(type, attr){
            const td = document.createElement("td");
            if (type === "BUTTON")
            {
                const btn = document.createElement("button");
                btn.innerText = attr;
                btn.classList.add("remove");
                td.appendChild(btn);
            }
            else
            {
                td.innerText = attr;
            }
            if (["BUTTON","LEVEL"].includes(type))
            {
                td.classList.add("item-center");
            }
            return td;
        }
        tr.appendChild(makeTd("CLASS", wowRandomCharacter.wow_class));
        tr.appendChild(makeTd("RACE", wowRandomCharacter.wow_race));
        tr.appendChild(makeTd("LEVEL", wowRandomCharacter.wow_level));
        tr.appendChild(makeTd("BUTTON", "X"));
        tbody.appendChild(tr);
    });
}

for (const btn of section.querySelectorAll(".no-d .remove"))
{
    btn.addEventListener("click", (e) => {
        const grandParent = e.target.parentElement.parentElement;
        grandParent.remove();
    });
}

section.querySelector(".yes-d").addEventListener("click", (e) => {
    //if (e.target.nodeName.toLowerCase() !== "button" || !e.target.classList.contains("remove")) return;
    // 아래 소스를 넣었을대 버튼을 제외한 나머지를 클릭하면 전체 tr이 사라졌다
    // e.preventDefault() 는 이벤트 취소이지 리턴이 아니다
     if (e.target.nodeName.toLowerCase() !== "button" || !e.target.classList.contains("remove"))
     {
        e.preventDefault();
        return;
     } 
    const grandParent = e.target.parentElement.parentElement;
    grandParent.remove();
});

// for (const btn of )
// {
//     btn.addEventListener("click", (e) => {
//         const grandParent = e.target.parentElement.parentElement;
//         grandParent.remove();
//     });
// }

//------------------------------------------------------------
// 강의 269
//------------------------------------------------------------
lab_no = 269
section =  document.querySelector(`section[lab="${lab_no}"]`);
const eventTarget = ["article","p"];

for (let t of eventTarget)
{
    section.querySelector(t).addEventListener("click", (e) => {
        alert(`나는 ${t}(이)닷`);
    });
}

for (let b of [1, 2])
{
    document.querySelector(`#btn${lab_no}_${b}`).addEventListener(`click`, (e) => {
        alert(`나는 ${e.target.id}(이)닷`);
        if (b === 2)
        {
            e.stopPropagation();
        }
    });
}


//------------------------------------------------------------
// 강의 268
//------------------------------------------------------------
lab_no = 268
section =  document.querySelector(`section[lab="${lab_no}"]`);
const date268 = section.querySelector(`#date${lab_no}`);
const text268 = section.querySelector(`#text${lab_no}`);
const textarea268 = section.querySelector(`#textarea${lab_no}`);

date268.addEventListener("input", (e) => {
    textarea268.value += e.target.value;
});

text268.addEventListener("input", (e) => {
    textarea268.value += e.target.value;
})

//date268
//------------------------------------------------------------
// 강의 267
//------------------------------------------------------------
const sct267 =  document.querySelector("section[lab='267']");
const form267 = document.querySelector("#form267");
form267.addEventListener("submit", (e) => {
    console.log("submit event");
    e.preventDefault();
});

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
