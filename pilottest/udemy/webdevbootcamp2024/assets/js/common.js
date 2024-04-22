//<script src="/pilottest/udemy/webdevbootcamp2024/assets/js/common.js"></script>
/* 유데미 강의 전용 JS */

//------------------------------------------------------------
// 
//------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // 제목설정
    function setDefault() {
        const url = window.location.href.split('/');
        let page = url[url.length - 1];
        let section = url[url.length - 2];
        if (page === undefined || page == null || section === undefined || section == null || page.indexOf('.html') < 0 || section.indexOf('section') < 0) return;

        page = page.split('.')[0];
        section = section.replace("section","");
        repeatText_1 = "섹션";

        const originTitle = document.title;
        document.title = repeatText_1 + section + " - " + originTitle;
        const h1Title = document.createElement("h1");
        h1Title.classList.add("main-title");
        h1Title.innerText = " - " + originTitle;
        const link = document.createElement("a");
        link.href = "index.html";
        link.innerText = repeatText_1 + section;
        h1Title.insertAdjacentElement("afterbegin",link);
        const main = document.querySelector("main");
        main.insertAdjacentElement("afterbegin",h1Title); //.appendChild(h1Title);

        if (page =="cp")
        {
            const sections = document.querySelectorAll("section");
            for (let sec of sections)
            {
                const cp = sec.getAttribute("cp");
                sec.querySelector("h2").innerText = cp + ". " + sec.querySelector("h2").innerText;
            }
        }

    }
    
    setDefault();
    //debugger;

    document.querySelector(".laypop").style.display = "none"
    

});


function getPokemon(no)
{
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + no + ".png";
}

const makeRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const newColor = `rgb(${r}, ${g}, ${b})`;
    return newColor;
}


